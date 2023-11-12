import { NextResponse } from 'next/server.js'
import mongo from '@/lib/mongo.js'
import User from '@/models/user'

export async function POST(req) {
  const { name, character } = await req.json()
  console.log(name, character)
  await mongo()
  const existingUser = await User.findOne({ name })
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 })
  }
  const newUser = new User({ name, character })
  const savedUser = await newUser.save()
  console.log(savedUser)
  return NextResponse.json({ message: 'User created', user: savedUser }, { status: 201 })
}

export async function GET() {
  await mongo()
  const users = await User.find()
  return NextResponse.json({ users })
}

export async function DELETE(req) {
  const { id } = await req.json()
  await mongo()
  const user = await User.findByIdAndDelete(id)
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }
  return NextResponse.json({ message: 'User deleted' }, { status: 200 })
}
