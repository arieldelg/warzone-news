'use client'
import * as yup from 'yup'
import { Formik, FormikHelpers, Field, Form, ErrorMessage } from "formik"
import Link from "next/link"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

const personSchema = yup.object({
    name: yup.string().max(20, 'Name must be at least 4 characters.').required(),
    email: yup.string().required().email('Invalid email address'),
    password: yup.string().required(),
})


interface MyformikValues {
    name: string,
    email: string,
    password: string,

}

const createAccount = () => {
    const { data: session } = useSession()
    if (session) {
        redirect('/store')
    }
    const [error, setError] = useState(false)
    const router = useRouter()

    const initialValues: MyformikValues = {
        name: '',
        email: '',
        password: '',
  
    }

    const dataSubmmitting = async (values: MyformikValues) => {
        
        try {
            const checkEmailExist = await fetch('/api/userExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values.email)
            })

           const { user } = await checkEmailExist.json()
            // console.log('user exist, yes or no?',user)
           if (user) {
            setError(true)
            return;
           } 
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            // console.log(response)
            // console.log('para ver si llegan bien los valores',values)
            if(response.ok) {
                router.push('/login')
            } else {
                console.log('usuario fallido')
            }
           
        } catch (error) {
            console.log(error)
        }
    }
    
    
    return (
        <main className="flex justify-center items-center w-screen h-screen">
            <Formik 
            initialValues={initialValues} 
            onSubmit={(values: MyformikValues,
                { setSubmitting, resetForm }: FormikHelpers<MyformikValues>
                ) => {
                    setError(false)
                    setSubmitting(false)
                    dataSubmmitting(values)
                    resetForm({
                        values: {
                            name: '',
                            email: '',
                            password: '',
                            
                        }
                    })
                }
            }
            validationSchema={personSchema} 
            >
                <Form className="w-96 rounded-xl shadow-4xl bg-black/5 p-8">
                    <h1 className="text-4xl font-bold py-2">Register</h1>
                    <div className="flex flex-col py-2">
                        <label htmlFor="name" className="text-lg font-semibold">UserName:</label>
                        <Field type="text" id="name" name="name" className="border px-2 py-1 rounded-lg" placeholder="nombre"/>
                        <ErrorMessage name='username' />
                    </div>
                    <div className="flex flex-col py-2">
                        <label htmlFor="email" className="text-lg font-semibold">Email:</label>
                        <Field type="email" id="email" name="email" className="border px-2 py-1 rounded-lg" placeholder="correo"/>
                        <ErrorMessage name='email'/>
                    </div>
                    {
                        error && 
                        <p className='w-full text-red-600 text-center'>Error: usuario ya existente</p>
                    }
                    <div className="flex flex-col py-2">
                        <label htmlFor="password" className="text-lg font-semibold">Password:</label>
                        <Field type="password" id="password" name="password" className="border px-2 py-1 rounded-lg" placeholder="contraseña"/>
                        <ErrorMessage name='password'/>
                    </div>
                    <button className='bg-teal-500 w-full py-2 rounded-xl mt-4 mb-2 hover:scale-105 transition duration-300' type="submit">Registrarse</button>
                    <Link href={'/login'}>
                        <button className='bg-red-500 w-full py-2 rounded-xl mt-2 hover:scale-105 transition duration-300'>Cancelar</button>
                    </Link>
                </Form>
            </Formik>
        </main>
    )
}

export default createAccount


