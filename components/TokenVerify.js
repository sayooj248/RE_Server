import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Token not found'))

  jwt.verify(token, process.env.Secret_key, (err, user) => {
    if (err) return next(errorHandler(401, 'error token'))

    req.user = user;
    next()
  })
}