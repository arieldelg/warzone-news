'use client'
import { Formik, FormikHelpers, Field, ErrorMessage, Form, replace } from "formik"
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import * as yup from 'yup'
import { startTransition, useEffect, useOptimistic, useState } from "react"
import { useCardContext } from "app/context/card-context"
import { sentData } from "app/services/MongoDB/actions/sentData"

type Wallet = {
    nombre_cuenta: string,
    money: string,
    tipo_moneda: string,
    tipo_cuenta: string,
}

const walletSchema = yup.object({
    nombre_cuenta: yup.string().required('porfavor, ingrese un nombre'),
    money: yup.string().required('porfavor, ingrese una cantidad'),
    tipo_moneda: yup.string().required('ingrese una cantidad'),
    tipo_cuenta: yup.string().required()
})

const WalletRegister = ({wallet}: any) => {
    console.log('wallet register',wallet)
    const { data: session  } = useSession()
    const router = useRouter()
    if(!session) {
        router.replace( '/login')
    }
    
    const {setGetOptimistic, send, setSend} = useCardContext()
    const [optimistic, addOptimisticWallet] = useOptimistic(wallet, (state, addWallet) => {
        return[...state, addWallet]
    })
    console.log('wallet register/optimistic', optimistic)
    const initialValues: Wallet = {
        nombre_cuenta: '',
        money: '',
        tipo_moneda: '',
        tipo_cuenta: '',
    }
    if(send) {
        setTimeout(() => {
            setGetOptimistic(optimistic)
        },10)
    }
    return (
        <>
        {
            session &&
            <div className="bg-black/5 shadow-4xl p-4 w-96 rounded-xl">
                <Formik
                initialValues={initialValues}
                onSubmit={(values: Wallet, { setSubmitting, resetForm }: FormikHelpers<Wallet>) => {
                    const toNumber = Number(values.money)
                    const toStringMoney = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2}).format(toNumber)
                    setSubmitting(false)
                    startTransition(() => {
                        addOptimisticWallet({
                            id: Math.random(),
                            nombre_cuenta: values.nombre_cuenta,
                            money: toStringMoney,
                            tipo_cuenta: values.tipo_cuenta,
                            tipo_moneda: values.tipo_moneda ,
                            isActive: false
                        })
                    })
                    setSend(false)
                    console.log(typeof toStringMoney)
                    sentData({
                        nombre_cuenta: values.nombre_cuenta,
                        money: toStringMoney,
                        tipo_cuenta: values.tipo_cuenta,
                        tipo_moneda: values.tipo_moneda,
                        isActive: false
                    })
                    // props.props()
                    resetForm({
                        values: {
                            nombre_cuenta: '',
                            money: '',
                            tipo_cuenta: '',
                            tipo_moneda: ''
                        }
                    })
                    setSend(true)
                    
                    router.replace('/store')
                }}
                validationSchema={walletSchema}
                >
                    {
                        formik => (
                            <Form> 
                                <div className="flex gap-2 py-2">
                                    <Link href={'/store'}>
                                        <ChevronLeftIcon className="w-6 cursor-pointer"/>
                                    </Link>
                                    <h1 className="text-2xl font-bold">New Wallet</h1>
                                </div>
                                <div className="w-full flex flex-col">
                                    <label htmlFor="nombre_cuenta" className="text-lg font-semibold px-2">Nombre de Cartera</label>
                                    <Field type='text' placeholder='Escribe aqui' name='nombre_cuenta' id='nombre_cuenta' className='px-2 mx-2 py-1 my-2 rounded-md'/>
                                    <ErrorMessage name="nombre_cuenta"/>
                                </div>
                                <div className="flex flex-col pb-4">
                                    <label htmlFor="tipo_cuenta" className="text-lg font-semibold px-2">Tipo de Cartera</label> 
                                    <Field as="select" name="tipo_cuenta" id="tipo_cuenta" className='text-gray-700 px-2 mx-2 mt-2 py-1 rounded-md'>
                                        <option value=""></option>
                                        <option value="Nomina">Nomina</option>
                                        <option value="Cuenta de cheques">Cuenta de Cheques</option>
                                        <option value="Credito">Credito</option>
                                        <option value="prestamo">Prestamo</option>
                                    </Field>
                                </div>
                                <div className="flex pb-4 pl-2">
                                    <div>
                                        <label htmlFor="money" className='text-lg font-semibold'>Cantidad</label>
                                        <Field type='number' name='money' id='money' placeholder='0.00' className="px-2 py-1 rounded-md" step='0.01'/>
                                        <ErrorMessage name="money" />
                                    </div>
                                    <div className="flex flex-col px-2">
                                        <label htmlFor="tipo_Moneda" className="text-lg font-semibold">Tipo</label>
                                        <Field as="select" name="tipo_moneda" id="tipo_moneda" className='py-1 rounded-md'>
                                            <option value=""></option>
                                            <option value="MX">MX</option>
                                            <option value="USD">USD</option>
                                            <option value="¥">YN</option>
                                        </Field>
                                    </div>
                                </div>
                                <button className='bg-teal-500 w-full py-2 rounded-xl mt-4 mb-2 hover:scale-105 transition duration-300' type="submit" disabled={formik.isSubmitting}>Registrar</button>
                                <Link href={'/store'}>
                                    <button className='bg-red-500 w-full py-2 rounded-xl mt-2 hover:scale-105 transition duration-300'>Cancelar</button>
                                </Link>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        }
        </>
    )
}

export { WalletRegister }