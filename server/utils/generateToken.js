import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET;
export const generateUserToken = (userId) => {
    const token = jwt.sign({userId}, jwtSecret, {expiresIn: '7d'})
    return token
}

export const verifyUserToken = (token) => {
    const decoded = jwt.verify(token,  jwtSecret)
    return decoded;
}
