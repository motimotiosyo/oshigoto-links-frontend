import { defineConfig } from 'orval';

export default defineConfig({
  stories: {
    input: './openapi.yaml',
    output: {
      mode: 'split',
      target: './src/lib/api/generated',
      schemas: './src/lib/api/generated/model',
      client: 'fetch',
      baseUrl: 'process.env.NEXT_PUBLIC_API_BASE_URL',
      override: {
        mutator: {
          path: './src/lib/fetchApi.ts',
          name: 'customFetch',
        },
        operations: {
          // React hooksは不要のためオフ
          'Stories.getAllStories': {
            mock: false,
          },
          'Stories.getStoryById': {
            mock: false,
          },
          'Stories.createStory': {
            mock: false,
          },
          'Stories.updateStory': {
            mock: false,
          },
          'Stories.deleteStory': {
            mock: false,
          },
        },
      },
    },
    hooks: false, // React hooksは生成しない
  },
});