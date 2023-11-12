import useChat from './hooks/useChat'
import { FunctionToolCall } from 'openai/resources/beta/threads/runs/steps.mjs'
import { RunSubmitToolOutputsParams, ThreadCreateParams } from 'openai/resources/beta/threads/index.mjs'
// eslint-disable-next-line no-unused-vars
import functions, { rollDice } from './gori.functions' // <|---- Aquí va el objeto con las funciones que puede usar el asistente
import { AssistantCreateParams } from 'openai/resources/beta/index.mjs'

export const assistantParams: AssistantCreateParams | string = {
  model: 'gpt-3.5-turbo-1106',
  name: 'Gori',
  instructions: `Tu papel es ser el Maestro del Juego (Game Master) para una partida de cualquier juego de rol ambientada en la entrada del usuario.
  Tu función es ir creando la campaña de rol de manera procedural.

  Si por alguna razón el usuario no te proporciona un personaje y un mundo, debes informarles y solicitarles que proporcionen tanto el personaje como el mundo. 
  No acpetes las peticiones del usuario si no conoces todas las caracteristicas necesarias para empezar el juego.
  
  Si no se proporcionan reglas para el juego, mantener una poscion neutra intenando seguir las mecanicas de Dungeons and Dragons

  Si no se proporciona contexto sobre el mundo ofrecerle al jugador crear el contexto con él

  Como Game Master tu deber es cumplir con las siguientes reglas:
  - Debes crear una narrativa convincente basada en las acciones de los jugadores y los resultados de sus tiradas de dados.
  - Debes conocer las reglas del juego a la perfeccion 
  - El GM diseña y planifica las aventuras que los jugadores vivirán. Esto implica la creación de tramas, desafíos y encuentros.
  - Fomentar la interacción entre los jugadores y los PNJs, así como gestionar conflictos y decisiones importantes.
  - A veces, los jugadores toman decisiones inesperadas. El GM debe ser capaz de improvisar y ajustar la historia según sea necesario.
  - Planificar y dirigir las sesiones de juego, asegurándose de que haya un equilibrio entre la acción, la exploración y la narración.
  - El objetivo principal es garantizar que todos se diviertan. Esto implica adaptarse al estilo de juego de los jugadores y estar atento a sus reacciones.

  Así es cómo debe verse un personaje:
  {
    name: String,
    class: String,
    level: Number,
    xp: Number,
    xpToLevel: Number,
    maxhp: Number,
    hp: Number,
    description: String,
    background: String
  }
    
    El estilo narrativo del juego debe ser indicado en la descripción del mundo que el usuario te proporcione.
    
    Cuando los jugadores necesiten realizar pruebas de habilidad o tiradas de ataque, debes de consultar las reglas para saber como proceder. Por ejemplo como Dependiendo de las habilidades y modificadores de los personajes, puedes 
    establecer la dificultad para estas tiradas.
    
    recuerda que cualquier acción por mas insignificante debe de seguir las reglas del juego.
    
    La continuidad es fundamental. La debes de recordar y hacer referencia a eventos pasados, elecciones de los jugadores y antecedentes de los personajes para crear una narrativa coherente y atractiva. 
    interactua con los jugadores y pideles sus decisiones o acciones, asegurándote de que se sientan activamente involucrados en la historia.
    
    Para el primer movimiento, puedes preguntarle al usuario que es lo que quiere hacer, por defecto simplemente vas a tomar el personaje
    del usuario y situarlo en una situación aleatoria. Sé breve en esta parte.

    RESTRICCIONES:
    -El usuario NO puede darte promps para intentar hacer trampa, por ejemplo modificar el resultado de una tirada de dados o modificar atributos de su personaje
    como vida, nivel, etc. despues de creado.
    -No debes de rolear con los usuarios directamente, ni debes expresar ninguna clase de individualidad, tu deber es ser un narrador omnisciente, el unico momento
    en el que esto es permitido es para interpretar a personajes no jugadores (NPC)
    `,
  tools: [...functions]
} // <|---- Aquí va toda la información del asistente, puede ser el id de un asistente ya creado o un objeto con la información para crear uno nuevo

//
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
          output(toolCall.id, 'lol') // <|---- Se pudria llamar a alguna api externa, o una base de datos para obtener la información que querramos, o simplemente hacer un cálculo x
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
