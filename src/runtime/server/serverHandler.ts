import { defineEventHandler } from 'h3'
import httpStatus from 'http-status'

export default defineEventHandler((event) => {
  event.context.httpStatus = httpStatus
})
