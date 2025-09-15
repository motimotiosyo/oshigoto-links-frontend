import { defineConfig } from 'orval';

export default defineConfig({
  api: {
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
      },
    },
    hooks: false, // React hooksは生成しない
  },
});