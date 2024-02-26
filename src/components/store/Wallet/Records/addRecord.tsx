'use client'
import { newRecord } from "app/services/MongoDB/actions/newRecord"
import { Formik, ErrorMessage, Field, Form, FormikHelpers } from "formik"
import { useEffect, useState } from "react"
import { XCircleIcon } from '@heroicons/react/24/solid'
import * as yup from 'yup'
import { getDataDB } from "app/services/MongoDB/actions/getDataDB"
import { getOneRecord } from "app/services/MongoDB/actions/getOneRecord"
import { updateOneRecord } from "app/services/MongoDB/actions/updateOneRecord"

type Record = {
    nombre: string,
    quantity: string,
    proyecto: string,
    category: string,
    descripcion: string,
}

const RecordSchema = yup.object({
    nombre: yup.string().required(() => <p className="text-red-500 text-center text-lg">Porfavor, ingrese un nombre</p>),
    quantity: yup.string().required(() => <p className="text-red-500 text-center text-lg">Porfavor, ingrese una cantidad</p>),
    proyecto: yup.string().required(() => <p className="text-red-500 text-center text-lg">Porfavor, ingrese una opcion</p>),
    category: yup.string(),
    descripcion: yup.string()
})
type Value = {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}
type MoneyData = {
    proyecto: string,
    money: string,
    _id: string
}
const AddRecord = ({setOpen, record}: any) => {
    console.log('record',record)
    const [value, setValue] = useState<Value | unknown>('Gasto')
    const [wallet, setWallet] = useState<string[]>([])
    const [moneyData, setMoneyData] = useState<MoneyData>()
    let initialValues: Record | any = {}
    if(!record) {
        initialValues = {
            nombre: '',
            quantity: '',
            proyecto: '',
            category: '',
            descripcion: ''
        }
    } else {
        initialValues = {
            nombre: record.nombre,
            quantity: record.quantity,
            proyecto: record.proyecto,
            category: record.category,
            descripcion: record.descripcion
        }
    }
    useEffect(() => {
        const gettingFromServer = async () => {
        const data = await getDataDB()
        const wallet = data.map((element: any) => element.nombre_cuenta)
        setWallet(wallet)
        const moneyData = data.map((element: any) => {
            return {
                proyecto: element.nombre_cuenta,
                money: element.money,
                _id: element._id
            }
        })
        setMoneyData(moneyData)
        
        }
        gettingFromServer()
    }, [])
    return (
            <div className="absolute bg-black/40 w-full h-full flex justify-center items-center top-0 z-10 left-0">
                <div className="bg-white border border-black/50 p-4 w-96 rounded-xl z-50" onClick={(e) => e.stopPropagation()}>
                    <div className="w-full flex justify-between items-center mb-4">
                        <h1 className="text-4xl font-bold">Nuevo Registro</h1>
                        <XCircleIcon className="w-10 hover:text-red-500 cursor-pointer" onClick={() => setOpen((prev:any) => !prev)}/>
                    </div>
                    <Formik 
                    initialValues={initialValues}
                    onSubmit={async (values: Record, { setSubmitting, resetForm }: FormikHelpers<Record>) => {
                        setSubmitting(false)
                        let newValue;
                        if(value === 'Gasto') {
                            newValue = `-${values.quantity}`
                        } else if (value === 'Ingreso') {
                            newValue = `${values.quantity}`
                        }
                        resetForm({
                            values: {
                                nombre: '',
                                quantity: '',
                                proyecto: '',
                                category: '',
                                descripcion: ''  
                            }
                        })
                        
                        setOpen((prev: any) => !prev)
                        if(!record) {
                            await newRecord({
                                nombre: values.nombre,
                                quantity: newValue,
                                proyecto: values.proyecto,
                                category: values.category,
                                descripcion: values.descripcion
                            }, moneyData)
                        } else {
                            let newValue;
                            //agregar condicional
                            console.log(newValue)
                            console.log(record.descripcion === values.descripcion)
                            // await updateOneRecord({...values})
                        }
                    }}
                    validationSchema={RecordSchema}
                    >
                        <Form>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="nombre" className="text-xl font-bold">Nombre</label>
                                <Field type='text' id='nombre' name='nombre' className='border border-black/30 px-2 py-1 rounded-md outline-blue-400'/>
                                <ErrorMessage name="nombre"/>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="proyecto" className="text-xl font-bold">Cartera</label>
                                <Field type='text' id='proyecto' name='proyecto' as='select' className='border border-black/30 px-2 py-1 rounded-md outline-blue-400'>
                                    <option value=""></option>
                                    {
                                        wallet.map((element: any) => {
                                            return <option value={element} key={element}>{element}</option>
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="proyecto"/>
                            </div>
                            <div className="flex justify-center mb-2">
                                <div className="my-4">
                                    <button 
                                    className={`px-8 py-1 ${value === 'Gasto'? 'bg-teal-600' : 'bg-teal-500'}  rounded-l-md border border-black/20 text-lg font-semibold `}
                                    value='Gasto'
                                    autoFocus
                                    onClick={(event) => setValue(event.target.value)}
                                    type="button"
                                    >Gasto</button>
                                    <button 
                                    className={`px-8 py-1 ${value === 'Ingreso'? 'bg-teal-600' : 'bg-teal-500'} rounded-r-md border border-black/20  focus:bg-teal-600 text-lg font-semibold`}
                                    value='Ingreso'
                                    onClick={(event) => setValue(event.target.value)}
                                    type="button"
                                    >Ingreso</button>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="quantity" className="text-xl font-bold">{value}</label>
                                <Field type='number' id='quantity' name='quantity' className='border border-black/30 px-2 py-1 rounded-md outline-blue-400'/>
                                <ErrorMessage name="quantity"/>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="category" className="text-xl font-bold">Tipo </label>
                                <Field id="category" name="category" as="select" type="text" className='border border-black/30 px-2 py-1 rounded-md outline-blue-400'>
                                    <option value=""></option>
                                    <option value="Comida">Comida</option>
                                    <option value="Restaurante">Restaurante</option>
                                    <option value="Bar">Bar</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Nomina">Nomina</option>
                                    <option value="Venta">Venta</option>
                                    <option value="Renta">Renta</option>
                                </Field>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="descripcion" className="text-xl font-bold">Descripcion</label>
                                <Field 
                                as="textarea"
                                name="descripcion" 
                                id="descripcion" 
                                cols={30} 
                                rows={10}
                                className="border border-black/30 w-full px-2 py-1" 
                                ></Field>
                            </div>
                            <button type="submit" className="bg-teal-500 w-full py-1 text-2xl font-semibold rounded-md mb-4 transition hover:scale-105 duration-500 border border-black/30 text-white">Registrar</button>
                            <button 
                            type="button" 
                            className="bg-red-500 w-full py-1 text-2xl font-semibold rounded-md transition hover:scale-105 duration-500 border border-black/30 text-white"
                            onClick={() => setOpen((prev: any) => !prev)}
                            >Cancelar</button>
                        </Form>
                    </Formik>
                </div>
            </div>
    )
}

export { AddRecord }