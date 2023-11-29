import { NextResponse } from 'next/server.js'
import { createUser, getUsers, deleteUser } from '@/services/mongoCRUD'

export async function POST(req) {
  try {
    const { name } = await req.json()
    const savedUser = await createUser(name)
    return NextResponse.json({ message: 'User created', user: savedUser }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

export async function GET() {
  try {
    const users = await getUsers()
    return NextResponse.json({ users })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json()
    await deleteUser(id)
    return NextResponse.json({ message: 'User deleted' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 404 })
  }
}
