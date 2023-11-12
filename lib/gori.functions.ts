import axios from 'axios'

export default [
  { type: 'code_interpreter' },
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
      name: 'uptdate_charcter',
      description:
        'Esta funcion la usas para actualizar el personaje del jugador en tiempo real, por ejemplo si llega a tomar 10 puntos de daño, tienes que actualizar al personaje',
      parameters: {
        type: 'object',
        properties: {
          level: { type: 'number', description: 'El nivel actual del personaje' },
          xp: {
            type: 'number',
            description:
              'Los puntos de experencia que tiene el personaje (Cuando se sube de nivel esto se establece a 0)'
          },
          xpToLevel: {
            type: 'number',
            description: 'Los puntos de experiencia necesarios para subir de nivel'
          },
          maxhp: {
            type: 'number',
            description: 'La vida maxima del personaje, este numero escala con el level'
          },
          hp: { type: 'number', description: 'La vida actual del personaje' }
        },
        required: []
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'add_user',
      description: 'Esta funcion la usas para agregar usuarios en la base de datos',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'El nombre del usuario' }
        },
        required: ['name']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'delete_user',
      description: 'Esta funcion la usas para eliminar usuarios en la base de datos',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'El id del usuario' }
        },
        required: ['id']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_users',
      description: 'Esta funcion la usas para obtener todos los usuarios en la base de datos',
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
  return `Gori, elfo, bardo, una vez besó un dragón, etc...` // <|---- Se pudria llamar a alguna api externa, o una base de datos para obtener la información que querramos, o simplemente hacer un cálculo x
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
