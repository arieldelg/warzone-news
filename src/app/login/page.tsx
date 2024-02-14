'use client'
import { Formik, FormikHelpers, Field, Form, ErrorMessage } from "formik"
import Link from "next/link"
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSession } from "next-auth/react"

interface Myformiklogin {
    email: string,
    password: string
}


const Login = () => {
    const [error, setError] = useState(false)
    const router = useRouter()
    const { data: session } = useSession()
    
    // if( session ) {
    //     return router.replace('/store') // esto se modifico recien
    // } 
    const initialValues: Myformiklogin = {
        email: '',
        password: ''
    }
    const sendDataLogin = async (values: Myformiklogin, reset:any) => {
        const { email, password } = values
        try {
            const response = await signIn('credentials', {email, password , redirect: false})
            if(response?.error) {
                console.log(response)
                setError(true)
                reset({
                    values: {
                        password: '',
                        email: ''
                    }
                })
                return
            } else {
                router.replace('/store')
            }
        } catch (error) {
            console.log(error)
        }  
    }
    return (
        <main className="w-screen h-screen flex items-center justify-center">
            <div className="w-96 rounded-xl shadow-2xl bg-black/5 p-8">
                <div className="flex items-center gap-2">
                    <Link href={'/'}>
                        <ChevronLeftIcon className="w-6 cursor-pointer"/>
                    </Link>
                    <p className="text-2xl font-semibold">Atras</p>
                </div>
                <Formik 
                initialValues={initialValues} 
                onSubmit={(
                    values: Myformiklogin, 
                    { setSubmitting, resetForm }: FormikHelpers<Myformiklogin>
                    ) => {
                        
                    setSubmitting(false)
                    sendDataLogin(values, () => resetForm())
                }}
                >
                    <Form>
                        <div className="flex flex-col py-2">
                            <label htmlFor="email" className="text-lg font-semibold">Email:</label>
                            <Field type="email" id="email" name="email" className="border px-2 py-1 rounded-lg" placeholder="correo"/>
                        </div>
                        <div className="flex flex-col py-2">
                            <label htmlFor="password" className="text-lg font-semibold">Password:</label>
                            <Field type="password" id="password" name='password' className="border px-2 py-1 rounded-lg" placeholder="contraseña"/>
                        </div>
                        <button className='bg-teal-500 w-full py-2 rounded-xl mt-4 mb-6 hover:scale-105 transition duration-300' type="submit">Login</button>
                    </Form>
                </Formik>
                {
                    error &&
                    <p className="text-center pb-4 text-red-700 text-2xl">Invalid credentials</p>
                }
                <div className="flex justify-end text-sm">
                    <p >Aun no tienes cuenta?</p>
                    <Link href={'/login/create-account'} className="underline underline-offset-2">Registrate Aqui</Link>
                </div>
                <Link href={'/login/reset-password'}>
                    <p className="text-center text-sm  underline underline-offset-2 pt-6">olvide mi contraseña</p>
                </Link>
            </div>
        </main>
    )

   
}

// const token = await auth()
// console.log(token)
export default Login