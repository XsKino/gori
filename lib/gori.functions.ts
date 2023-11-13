import axios from 'axios'

export default [
  { type: 'code_interpreter' },
  { type: 'retrieval' },
  {
    type: 'function',
    function: {
      name: 'roll-dice',
      description: 'rolls a dice',
      parameters: {
        type: 'object',
        properties: {
          n: { type: 'number', description: 'number of dices to roll' },
          d: { type: 'number', description: 'number of faces of the dices' }
        },
        required: []
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'update_character',
      description:
        'This function is used to update the player character in real-time, for example, if they take 10 damage, you need to update the character.',
      parameters: {
        type: 'object',
        properties: {
          level: { type: 'number', description: 'The current level of the character' },
          xp: {
            type: 'number',
            description: 'The experience points the character has (reset to 0 when leveling up)'
          },
          xpToLevel: {
            type: 'number',
            description: 'Experience points required to level up'
          },
          maxhp: {
            type: 'number',
            description: 'The maximum life of the character, this number scales with the level'
          },
          hp: { type: 'number', description: 'The current life of the character' }
        },
        required: []
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'add_user',
      description: 'This function is used to add users to the database',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'The name of the user' }
        },
        required: ['name']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'delete_user',
      description: 'This function is used to delete users from the database',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'The user id' }
        },
        required: ['id']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_users',
      description: 'This function is used to retrieve all users from the database',
      parameters: { type: 'object', properties: {} }
    }
  }
] as const

export const rollDice = ({ n, d }: { n: number; d: number }): number[] => {
  const rolls = []
  for (let i = 0; i < n; i++) {
    rolls.push(Math.floor(Math.random() * d) + 1)
  }
  return rolls
}

export const getCharacterSheet = async (id: string): Promise<string> => {
  return `Gori, elf, bard, once kissed a dragon, etc...` // <|---- Could call some external API or a database to get the desired information or simply perform a calculation
}

export async function getUsers() {
  const response = await axios.get('http://localhost:3000/api/user')
  return response.data.users
}

export async function addUser({ name }: { name: string }) {
  const response = await axios.post('http://localhost:3000/api/user', { name })
  const newUser = response.data.user
  const newUserJSON = JSON.stringify(newUser)
  return newUserJSON
}

export async function deleteUser({ id }: { id: string }) {
  const response = await axios.delete('http://localhost:3000/api/user', {
    data: id
  })
  const deletedUser = response.data.user
  const deletedUserJSON = JSON.stringify(deletedUser)
  return deletedUserJSON
}

export async function putUser() {
  const response = await axios.put('http://localhost:3000/api/user')
  const users = response.data.users
  const usersJSON = JSON.stringify(users)
  return usersJSON
}
