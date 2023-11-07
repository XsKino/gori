import { getUserByApiKey } from '@/MongoDB/engine'
import { Story, StoryBlock } from '@/types/engine'

const validateRequest = (body: any): boolean | string => {
  if (
    !body.story ||
    !body.blockVariants ||
    !body.imageVariants ||
    !body.story?.narrative ||
    !body.story?.genres ||
    !body.story?.plot ||
    !body.story?.worldSetting
  ) {
    return `Bad request: optional -> *
    type StoryRequest = {
      story: Story,
      blockVariants: number,
      imageVariants: number,
      *imageGenerationType: 'given' | 'generated'
    }

    type Story = {
      narrative: string,
      genres: string[],
      plot: string,
      worldSetting: string,
      *artStyle: string,
      *modelConfig: string,
      *characterModel: string,
      *contextModel: string
    }
    `
  }

  if (body.imageGenerationType && body.imageGenerationType === 'generated' && body.blockVariants !== 1) {
    return `Bad request: if imageGenerationType is 'generated', blockVariants must be 1`
  }

  return true
}

const validateApiKey = async (apiKey: string | null): Promise<boolean> => {
  if (!apiKey) return false
  const user = await getUserByApiKey(apiKey)
  return !!user
}

const buildSystemPrompt = (story: Story): string => {
  let prompt: string = `
    you are a professional story writer, your Job is to help ME write a story, using the data from the story I already have.
    You will have to follow these rules:
      # Rules:
      - You are excelent at interpreting data in JSON format.
      - you must return ONLY a STRINGIFIED JSON object with the following properties:
        {
          characters: Character[],
          content: string,
          context: string
        }
        ${
          story.characterModel
            ? `Schema Character = ${JSON.stringify(story.characterModel)}`
            : `Schema Character = string`
        }
      - I will explain these properties so you can give proper information:
        + characters: an array of characters that will contain the characters that are present in the story block you are generating.
        + content: a string that will contain the content of the story block you are generating, this content is what the reader would read.
        + context: the immediate context of the story block you are generating, this may include useful data that is not included in the content, such as the Date in the story, the location, how a character is feeling etc. (This should help with generating the next StoryBlock in a way that makes sense).
        + Schema Character: it may be a string, or it may be a specific Schema that you will have to follow. If it is a string, you can use any string you want, but if it is a Schema, you will have to follow the rules of that Schema.
      - Your response will be consumed by an API, so It is important that you follow the rules and return ONLY A STRINGIFIED JSON OBJECT.\
      - I will give you the following initial data from the story to help you generate new StoryBlocks:
        {
          narrative: string,
          genres: string[],
          plot: string,
          worldSetting: string
        }
      - I will explain these properties so you can understand it better:
        + narrative: the narrative genre of the story, the way the story is told (e.g. Novel, Fable, Tale, etc.)
        + genres: the genres of the story (e.g. Fantasy, Sci-Fi, Romance, etc.)
        + plot: the plot of the story, the main events that happen in the story.
        + worldSetting: the setting of the story, the world in which the story takes place.
  `

  if (story.modelConfig) {
    story.modelConfig.forEach((rule: string) => {
      prompt += `    - ${rule}\n`
    })
  }

  prompt += `
  You will use the following data from a story to generate new StoryBlocks following the rules above:
    # Story:
      ${JSON.stringify({
        narrative: story.narrative,
        genres: story.genres,
        plot: story.plot,
        worldSetting: story.worldSetting
      })}
  `

  return prompt
}

// EXPORTS

const exports = {
  validateRequest,
  validateApiKey,
  buildSystemPrompt
}

export default exports
