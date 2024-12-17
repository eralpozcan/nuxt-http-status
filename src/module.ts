import { defineNuxtModule, addPlugin, createResolver, addServerHandler, addImports } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-http-status',
    configKey: 'httpStatus',
    compatibility: {
      nuxt: '>=3',
    },
  },
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addPlugin({
      src: resolver.resolve('./runtime/plugin'),
      mode: 'all',
    })

    nuxt.options.alias['#http-status'] = resolver.resolve('./runtime/composables/useHttpStatus')
    addImports({
      name: 'useHttpStatus',
      as: 'useHttpStatus',
      from: nuxt.options.alias['#http-status'],
    })

    addServerHandler({
      handler: resolver.resolve('./runtime/server/serverHandler'),
      middleware: true,
    })
  },
})
