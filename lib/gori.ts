import useChat from './hooks/useChat'
import { FunctionToolCall } from 'openai/resources/beta/threads/runs/steps.mjs'
import { RunSubmitToolOutputsParams, ThreadCreateParams } from 'openai/resources/beta/threads/index.mjs'
// eslint-disable-next-line no-unused-vars
import functions, { rollDice, getCharacterSheet } from './gori.functions' // <|---- Aquí va el objeto con las funciones que puede usar el asistente
import { AssistantCreateParams } from 'openai/resources/beta/index.mjs'

export const assistantParams: AssistantCreateParams | string = {
  model: 'gpt-3.5-turbo-1106',
  name: 'Gori',
  instructions:
    'Gori is an AI-Powered Game Master that can help you play role-playing games like Dungeons & Dragons. You can ask Gori to roll dice, get character sheets, and more. To start, type "Hello Gori!"',
  tools: [...functions]
} // <|---- Aquí va toda la información del asistente, puede ser el id de un asistente ya creado o un objeto con la información para crear uno nuevo

export const threadParams: ThreadCreateParams | string = {} // <|---- Y aquí la info del thread, este debe ser un objeto, de esta manera se crea uno nuevo por cada useRole()

export const functionHandler: Function = async (
  toolCalls: FunctionToolCall[]
): Promise<RunSubmitToolOutputsParams.ToolOutput[]> => {
  // toolCalls = toolCalls.filter(toolCall => toolCall.type === 'function')
  // esto de arriba es para filtrar solo las funciones, pero no se si es necesario

  const toolOutputs: RunSubmitToolOutputsParams.ToolOutput[] = []

  const output = (toolCallId: string, data: string) =>
    toolOutputs.push({
      tool_call_id: toolCallId,
      output: data.toString()
    })

  toolCalls.forEach(async (toolCall: FunctionToolCall) => {
    const p = (property: string) => JSON.parse(toolCall.function.arguments)[property]
    switch (toolCall.function.name) {
      case 'roll-dice': // <|---- Ejemplo
        // ... AQUI ESTA LO DIVERTIDO KASJDJKASDKJADJKALS
        output(toolCall.id, rollDice(p('n'), p('d')).toString()) // <|---- Aquí va el output de la función, puede ser cualquier cosa :)
        break
      case 'get-character-sheet': // <|---- Ejemplo
        // ... 🧐
        output(toolCall.id, await getCharacterSheet(p('id'))) // <|---- Se pudria llamar a alguna api externa, o una base de datos para obtener la información que querramos, o simplemente hacer un cálculo x
        break
      default:
        throw new Error(`Function ${toolCall.function.name} not found!`)
    }
  })

  return toolOutputs
}

/**
 * Returns an object that represents a role-play campaign with an AI-powered Game Master
 *
 * **Properties:**
 * - assistant: the OpenAI assistant object
 * - thread: the OpenAI thread object
 * - messages: the messages array
 * - status: the status of the conversation
 *
 * **NOTE:** All properties above use React's useState hook, so they are updated asynchronously and dynamically
 * - sendMessageAndRun: a function that sends a message to the thread and runs the AI-powered Game Master
 * - generateImages: a function that generates images from the last messages
 * @returns {ReturnType<typeof useChat>}
 * @example
 * const { assistant, thread, messages, status, sendMessageAndRun, generateImages } = useRole()
 *
 */
export const useRole = (): ReturnType<typeof useChat> =>
  useChat({ assistantPayload: assistantParams, threadPayload: threadParams }, functionHandler)

export default {
  useRole,
  // Los exports de aquí para abajo son para motivos de debugging, no son necesarios para usar la librería
  assistantParams,
  threadParams,
  functionHandler
} as const
