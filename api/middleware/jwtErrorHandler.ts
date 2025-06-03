import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from 'express-jwt'

export function jwtErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({
      error: 'Invalid or missing token',
      message: err.message,
    })
  }

  next(err)
}