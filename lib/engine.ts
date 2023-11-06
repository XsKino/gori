const validateRequest = (body: any): boolean | string => {
  if (
    !body.story ||
    !body.apiKey ||
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
      apiKey: string,
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

const validateApiKey = (apiKey: string): boolean => {
  // IDK how to do this yet
  return true
}

// EXPORTS

const exports = {
  validateRequest,
  validateApiKey
}

export default exports
