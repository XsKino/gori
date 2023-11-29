import { NextResponse } from 'next/server.js'

export async function GET(req, { params }) {
  return NextResponse.json(
    'este handler es nada mas para que vercel no se queje en el deploy de que esta ruta no es un module :D'
  )
}
