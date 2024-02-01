import { Mongo_Url } from "./urls"

const data = {
    "username": "luisdelgrande@hotmail.com",
    "password": "contraseñadeprueba"
}

const auth = async () => {
    try {
        const response = await fetch(Mongo_Url.authentication.user,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const token = response.json()
        return token
    } catch (error) {
        console.log(error)
    }
}

export { auth }