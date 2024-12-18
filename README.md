<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# Nuxt Http-Status Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt 3 module that integrates the `http-status` package, making HTTP status codes and messages easily accessible both on client and server. This allows you to consistently reference codes and associated messages without needing to manually import `http-status` in every file.


- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/eralpozcan/nuxt-http-status?file=playground%2Fapp.vue)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- 📦 **Easy Access to HTTP Status Codes**: Provides a `$httpStatus` object via Nuxt's injection, so you can easily reference `httpStatus.OK`, `httpStatus.NOT_FOUND`, etc.
- 💡 **Composable Integration**: Use `useHttpStatus()` composable to access codes and messages in your Vue components without imports.
- 🌐 **Server-Side Context**: Leverages a server handler to inject `httpStatus` into `event.context`, letting you set status codes in your API endpoints without additional imports.
- 🎉 **TypeScript Support**: Fully typed, improving DX with auto-completion and type hints.


## Quick Setup

Install the module into your Nuxt application with:

```bash
npx nuxi module add nuxt-http-status
```
Or add it manually to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-http-status'
  ]
})
```


## Usage Examples
### Client-Side (Components)
Within a `*.vue` component, you can easily access HTTP status codes:

```vue
<script setup lang="ts">
const { OK, NOT_FOUND } = useHttpStatus()

console.log(OK) // 200
console.log(NOT_FOUND) // 404

// Fetch an API endpoint with a chosen status code
const response = await $fetch('/api/status?code=404')
console.log(response) // { message: 'Status code returned: 404', code: 404 }
</script>

<template>
  <div>
    <h2>HTTP Status Codes</h2>
    <p>OK: {{ OK }}</p>
    <p>NOT_FOUND: {{ NOT_FOUND }}</p>
  </div>
</template>
```

## Server-Side (API Routes)
In your server API routes (e.g., `server/api/status.ts`), `httpStatus` is available via `event.context`:


Basic example
```ts
import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  const { httpStatus } = event.context
  event.node.res.statusCode = httpStatus.OK
  return { message: httpStatus[`${httpStatus.OK}_MESSAGE`], code: httpStatus.OK }
})
```



So that you can try others.
```ts 
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler((event) => {
  const { httpStatus } = event.context
  const query = getQuery(event)
  
  let code = parseInt((query.code as string) || '', 10)
  if (isNaN(code) || !Object.values(httpStatus).includes(code)) {
    code = httpStatus.OK
  }

  event.node.res.statusCode = code
  return { message: `Status code returned: ${code}`, code }
})
```
No direct `import httpStatus from 'http-status'` is needed here—it's already injected!


## Accessing Messages
`http-status` also provides standard messages for each code, accessible via keys like `200_MESSAGE` or `404_MESSAGE`:

```ts
const status = useHttpStatus()
console.log(status['200_MESSAGE']) // "OK"
console.log(status['404_MESSAGE']) // "Not Found"
```


That's it! You can now use Nuxt-HTTP-Status in your Nuxt app ✨


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-http-status/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-http-status

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-http-status.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-http-status

[license-src]: https://img.shields.io/npm/l/nuxt-http-status.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-http-status

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
