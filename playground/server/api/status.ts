import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  const { httpStatus } = event.context
  event.node.res.statusCode = httpStatus.OK
  return { message: httpStatus[`${httpStatus.OK}_MESSAGE`], code: httpStatus.OK }
})
