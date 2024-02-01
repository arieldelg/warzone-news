import jwt , { JwtPayload } from 'jsonwebtoken'


interface SignOption {
    expiresIn?: string | number
}

const DEFAULT_OPTIONS: SignOption = {
    expiresIn: '1h'
}

export function signJwtAccesToken(payload: JwtPayload, options: SignOption = DEFAULT_OPTIONS) {
    const secret_key= process.env.SECRET_KEY_TOKEN
    const token = jwt.sign(payload, secret_key!, options)
    return token
}

export function verifyJwt(token: string) {
    try {
        const secret_key= process.env.SECRET_KEY_TOKEN
        const decoded = jwt.verify(token, secret_key!)
        return decoded as JwtPayload
    } catch (error) {
        console.log(error)
        return null
    }
}