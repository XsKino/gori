import OpenAI from "openai";
import axios from "axios";
import { NextResponse } from "next/server.js";

//TODO LO DE OPENAI AQUI
const client = new OpenAI();
//TODO LO DE OPENAI AQUI

//Funciones de la API
async function dalle() {
  const image = await client.images.generate({
    model: "dall-e-2",
    prompt: "Anime girl saying eww",
  });
  console.log(image.data[0].url);
  return image.data[0].url;
}

//Funciones de la API
export async function POST(req, { params }) {
  const { msg } = await req.json();
  const { id } = await params;
  //Importar mi assistente
  const myAssistant = await client.beta.assistants.retrieve(
    "asst_N3wrqlPoVtLrsRZuPz3oOrom"
  );
  //obtener el thread
  const thread = await client.beta.threads.retrieve(id);
  //Mandar mensaje
  const message = await client.beta.threads.messages.create(thread.id, {
    role: "user",
    content: msg,
  });
  //correrlo
  const run = await client.beta.threads.runs.create(thread.id, {
    assistant_id: myAssistant.id,
  });
  //esperar a que se complete
  let runer = {};
  while (true) {
    runer = await client.beta.threads.runs.retrieve(thread.id, run.id);
    console.log(runer.status);
    switch (runer.status) {
      case "queued":
      case "in_progress":
        // No hagas nada y espera
        break;
      case "requires_action":
        //En caso de que se requiera una accion
        //primero vamos a agarrar la id y la funcion
        const id = runer.required_action.submit_tool_outputs.tool_calls[0].id;
        const name =
          runer.required_action.submit_tool_outputs.tool_calls[0].function.name;
        //handle

        const run = await client.beta.threads.runs.submitToolOutputs(
          thread.id,
          runer.id,
          {
            tool_outputs: [
              {
                tool_call_id: id,
                //output: await dalle(),
                output: "nya",
              },
            ],
          }
        );
        break;
      case "completed":
        const threadMessages = await client.beta.threads.messages.list(
          thread.id
        );
        return NextResponse.json(
          {
            message: threadMessages.data[0].content[0].text.value,
            test: threadMessages.data,
            id: thread.id,
          },
          { status: 201 }
        );
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

export async function GET(req, { params }) {
  const { id } = await params;
  const threadMessages = await client.beta.threads.messages.list(id);
  return NextResponse.json(
    {
      message: threadMessages.data[0].content[0].text.value,
      test: threadMessages.data,
      id: id,
    },
    { status: 201 }
  );
}
