import httpStatus from 'http-status'
import { defineNuxtPlugin } from '#app'

declare module '#app' {
  interface NuxtApp {
    $httpStatus: typeof httpStatus
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $httpStatus: typeof httpStatus
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('httpStatus', httpStatus)
})
