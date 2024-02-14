import authOptions from "app/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"

const Test = async () => {
    const session = await getServerSession(authOptions)
    console.log('test, /tesr',session)
    return (
        <div>
            {/* {
                session?.user.role !== 'admin' &&
                <li>tienes que ser admin para entrar</li>
            } */}
    
        </div>
    )
}

export default Test