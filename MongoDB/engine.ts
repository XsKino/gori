import type { User } from '@/types/storyteller'

// MOCKED DATA
const users: User[] = [
  {
    __id: `123`,
    username: 'testuser',
    credits: 100,
    apiKeys: [
      'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
      '55c8079ac96c6a4f6a94e3460c79e4006d62374cce6e9fc8b281938a3abc7627'
    ]
  },
  {
    __id: `456`,
    username: 'testuser2',
    credits: 0,
    apiKeys: ['']
  }
]

export const getUserByApiKey = async (apiKey: string) => {
  // hash api key
  // get user with api key
  const hashedApiKey = await sha256(apiKey)
  console.log(hashedApiKey)
  const user = users.find(user => user.apiKeys.includes(hashedApiKey))
  return user
}

async function sha256(message: string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message)

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // convert bytes to hex string
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('')

  return hashHex
}
