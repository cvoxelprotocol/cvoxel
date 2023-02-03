import { HttpStatus } from './error'

export const isGoodResponse = (status: number) =>
  status === HttpStatus.OK || status === HttpStatus.CREATED || status === HttpStatus.ACCEPTED

export const isUnAuthorized = (status: number) =>
  status === HttpStatus.UNAUTHORIZED || status === HttpStatus.FORBIDDEN
