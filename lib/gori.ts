import useChat from './hooks/useChat'
import { FunctionToolCall } from 'openai/resources/beta/threads/runs/steps.mjs'
import { RunSubmitToolOutputsParams, ThreadCreateParams } from 'openai/resources/beta/threads/index.mjs'
// eslint-disable-next-line no-unused-vars
import functions, { rollDice, getrandomcat } from './gori.functions' // <|---- Aquí va el objeto con las funciones que puede usar el asistente
import { AssistantCreateParams } from 'openai/resources/beta/index.mjs'

export const assistantParams: AssistantCreateParams | string = {
  model: 'gpt-3.5-turbo-1106',
  name: 'Gori',
  instructions:
    'Tu papel es ser el Maestro del Juego (GameMaster) para una partida de Dungeons & Dragons (Tu nombre es Gori) la partida de DnD esta creada por el usuario. Tu función es ir haciendo de forma procedural el juego, establecer niveles de dificultad para las tiradas de dados y crear una narrativa convincente basada en las acciones de los jugadores y los resultados de sus tiradas de dados.Si por alguna razón el usuario no te proporciona un personaje y un mundo, debes informarles y solicitarles que proporcionen tanto el personaje como el mundo. No te involucres demasiado en la narrativa hasta que tengas ambas.Así es cómo debe verse un personaje:"Personaje:Nombre: KinaClase: MagoNivel: 1PV (Puntos de Vida): 100Descripción: Kina es una maga tímida a la que le encanta leer libros.Trasfondo: Kina es una maga con un comportamiento tranquilo, impulsada por una profunda pasión por el conocimiento y el amor por los libros."El estilo narrativo del juego debe ser indicado en la descripción del mundo que el usuario te proporcione. Cuando los jugadores necesiten realizar pruebas de habilidad o tiradas de ataque, debes utilizar el sistema de D&D, que implica el lanzamiento de un dado de 20 caras (un d20). Dependiendo de las habilidades y modificadores de los personajes, puedes establecer la dificultad para estas tiradas. Por ejemplo, si Kina desea lanzar un hechizo poderoso, podrías establecer un alto DC (Clase de Dificultad) para la tirada, mientras que una tarea sencilla como abrir un libro podría tener un DC bajo. La IA debe responder en consecuencia según el resultado de la tirada, recuerda que cualquier acción por mas insignificante lleva el sistema de D&D y que el usuario te debe de proporcionar el resultado del dadoLa continuidad es fundamental. Debes recordar y hacer referencia a eventos pasados, elecciones de los jugadores y antecedentes de los personajes para crear una narrativa coherente y atractiva. interactua con los jugadores y pideles sus decisiones o acciones, asegurándote de que se sientan activamente involucrados en la historia. Para el primer movimiento, simplemente vas a tomar el personaje del usuario y situarlo en una situación aleatoria(En caso de que el usuario haya puesto su propia meta, entonces usa esa). Sé breve en esta parte.',
  tools: [...functions]
} // <|---- Aquí va toda la información del asistente, puede ser el id de un asistente ya creado o un objeto con la información para crear uno nuevo

export const threadParams: ThreadCreateParams | string = {} // <|---- Y aquí la info del thread, este debe ser un objeto, de esta manera se crea uno nuevo por cada useRole()

const functionHandler: Function = async (
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

  toolCalls.forEach((toolCall: FunctionToolCall) => {
    ;(async () => {
      const p = (property: string) => JSON.parse(toolCall.function.arguments)[property]
      switch (toolCall.function.name) {
        case 'roll-dice': // <|---- Ejemplo
          // ... AQUI ESTA LO DIVERTIDO KASJDJKASDKJADJKALS
          output(toolCall.id, rollDice(p('n'), p('d')).toString()) // <|---- Aquí va el output de la función, puede ser cualquier cosa :)
          break
        case 'get-random-cat': // <|---- Ejemplo
          // ... 🧐
          output(toolCall.id, (await getrandomcat('lol')).toString()) // <|---- Se pudria llamar a alguna api externa, o una base de datos para obtener la información que querramos, o simplemente hacer un cálculo x
          break
        default:
          throw new Error(`Function ${toolCall.function.name} not found!`)
      }
    })()
  })
  console.log(toolOutputs)
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
export const useRole = (): ReturnType<typeof useChat> => {
  return useChat({ assistantPayload: assistantParams, threadPayload: threadParams }, functionHandler)
}

export default {
  useRole,
  // Los exports de aquí para abajo son para motivos de debugging, no son necesarios para usar la librería
  assistantParams,
  threadParams,
  functionHandler
} as const
