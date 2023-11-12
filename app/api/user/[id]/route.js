import { NextResponse } from 'next/server.js'
import mongo from '@/lib/mongo.js'
import User from '@/models/user.js'

export async function GET(req, { params }) {
  const { id } = params
  await mongo()
  const user = await User.findOne({ name: id })
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }
  return NextResponse.json({ user }, { status: 200 })
}

export async function PUT(request, { params }) {
  const { id: name } = params
  const { character } = await request.json()
  await mongo()
  await User.findOneAndUpdate({ name }, { $set: { character } }, { new: true })
  return NextResponse.json({ message: 'Character updated' }, { status: 200 })
}
