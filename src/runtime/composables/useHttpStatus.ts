import { useNuxtApp } from '#build/imports'

/**
 * A composable function that provides access to the `httpStatus` object injected by the Nuxt plugin.
 *
 * This function relies on the Nuxt App context to access the `$httpStatus` property,
 * which is populated by the custom Nuxt plugin. It returns the `httpStatus` object,
 * allowing you to reference both HTTP status codes and their standard reason phrases/messages
 * throughout your application.
 *
 * @example
 * ```typescript
 * const { OK, NOT_FOUND } = useHttpStatus()
 * console.log(OK) // 200
 * console.log(NOT_FOUND) // 404
 *
 * // Accessing associated messages:
 * const status = useHttpStatus()
 * console.log(status['200_MESSAGE']) // "OK"
 * console.log(status['404_MESSAGE']) // "Not Found"
 * ```
 *
 * @returns {object} The `httpStatus` object containing various HTTP status codes and messages.
 */
export function useHttpStatus() {
  const { $httpStatus } = useNuxtApp()
  return $httpStatus
}
