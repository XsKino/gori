export default [
  {
    type: 'function',
    function: {
      name: 'roll-dice',
      description: 'rolls a dice',
      parameters: {
        type: 'object',
        properties: {
          n: { type: 'number', description: 'number of dices to roll' },
          d: { type: 'number', description: 'number of faces of the dices', enum: [6, 20] }
        },
        required: []
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get-character-sheet',
      description: 'Get the character sheet of a character',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'The id of the character inside the database' }
        },
        required: ['id']
      }
    }
  }
] as const

export const rollDice = (n: number, d: number): number[] => {
  const rolls = []
  for (let i = 0; i < n; i++) {
    rolls.push(Math.floor(Math.random() * d) + 1)
  }
  return rolls
}

export const getCharacterSheet = async (id: string): Promise<string> => {
  return `Gori, elfo, bardo, una vez besó un dragón, etc...` // <|---- Se pudria llamar a alguna api externa, o una base de datos para obtener la información que querramos, o simplemente hacer un cálculo x
}
