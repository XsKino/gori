import OpenAI from 'openai'
import useConversation from './hooks/useConversation'
import { FunctionToolCall } from 'openai/resources/beta/threads/runs/steps.mjs'
import { RunSubmitToolOutputsParams } from 'openai/resources/beta/threads/index.mjs'
// eslint-disable-next-line no-unused-vars
import functions, { rollDice, getCharacterSheet } from './gori.functions' // <|---- Aquí va el objeto con las funciones que puede usar el asistente

export const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY
})

export const assistantParams = '' // <|---- Aquí va toda la información del asistente, puede ser el id de un asistente ya creado o un objeto con la información para crear uno nuevo

export const threadParams = '' // <|---- Y aquí la info del thread, este debe ser un objeto, de esta manera se crea uno nuevo por cada useRole()

export const functionHandler = async (
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
 * @returns {ReturnType<typeof useConversation>}
 * @example
 * const { assistant, thread, messages, status, sendMessageAndRun } = useRole()
 *
 */
export const useRole = (): ReturnType<typeof useConversation> =>
  useConversation(openai, { assistantPayload: assistantParams, threadPayload: threadParams }, functionHandler)

export default {
  openai, // <|---- Aquí está la instancia de la API de OpenAI, por si se quiere usar para algo más
  useRole,
  // Los exports de aquí para abajo son para motivos de debugging, no son necesarios para usar la librería
  assistantParams,
  threadParams,
  functionHandler
} as const
