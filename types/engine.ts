export type StoryBlock = {
  role: string
  characters: object[]
  content: string
  context: string
}

export type Story = {
  narrative: string
  genres: string[]
  plot: string
  worldSetting: string

  artStyle: string // <- for Image generation (e.g. "anime", "realistic", "cartoon", etc.)

  history: StoryBlock[]

  // ADVANCED: for development
  modelConfig: string[]
  characterModel: string
}

export type StoryRequest = Request & {
  story: Story
  blockVariants: number
  imageVariants: number
  imageGenerationType: 'given' | 'generated'
}

export type StoryResponse = Response & {
  blocks: StoryBlock[]
  images: string[]
}

// export type StoryObject = {
//   id: string
//   title: string
//   author: string
//   coverImage: string
//   history: Story[]
// }
