import { sentData } from 'app/services/MongoDB/actions/sentData'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { startTransition } from 'react'
import * as yup from 'yup'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { colors } from 'app/util/colors'
import { useState } from 'react'


const walletSchema = yup.object({
    nombre_cuenta: yup.string().required('porfavor, ingrese un nombre'),
    money: yup.string().required('porfavor, ingrese una cantidad'),
    tipo_moneda: yup.string().required('ingrese una cantidad'),
    tipo_cuenta: yup.string().required()
})

type Wallet = {
    nombre_cuenta: string,
    money: string,
    tipo_moneda: string,
    tipo_cuenta: string,
}

type SaveColor = {
    tailwind: string,
    color: string
}

const CardAddWallet = ({
    addOptimisticWallet, 
    setOpen, 
    }: any) => {
    const [openColors, setOpenColors] = useState<boolean>(false)
    const [saveColor, setSaveColor] = useState<SaveColor | null>(null)
    const initialValues: Wallet = {
        nombre_cuenta: '',
        money: '',
        tipo_moneda: '',
        tipo_cuenta: '',
    }
    const handlingSaveColor = (element: SaveColor) => {
        setSaveColor(element)
        setOpenColors(false)
    }
    const handlingCloseAddWallet = () => {
        setSaveColor(null)
        setOpen(false)
    }
    return (
        <div className='absolute top-0 left-0  bg-black/50 w-screen h-screen flex justify-center items-center z-50'>
                <div className="bg-white/95 shadow-2xl p-4 w-96 rounded-xl mr-[180px]">
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
                        sentData({
                            nombre_cuenta: values.nombre_cuenta,
                            money: toStringMoney,
                            tipo_cuenta: values.tipo_cuenta,
                            tipo_moneda: values.tipo_moneda,
                            isActive: false,
                            color: saveColor?.color,
                            colorTailwind: saveColor?.tailwind
                        })
                        resetForm({
                            values: {
                                nombre_cuenta: '',
                                money: '',
                                tipo_cuenta: '',
                                tipo_moneda: ''
                            }
                        })
                        setSaveColor(null)
                        setOpen(false)
                    }}
                    validationSchema={walletSchema}
                    >
                        {
                            formik => (
                                <Form> 
                                    <div className="flex gap-2 py-2" onClick={() => setOpen(false)}>
                                        <ChevronLeftIcon className="w-6 cursor-pointer"/>
                                        <h1 className="text-2xl font-bold">New Wallet</h1>
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <label htmlFor="nombre_cuenta" className="text-lg font-semibold px-2">Nombre de Cartera</label>
                                        <Field type='text' placeholder='Escribe aqui' name='nombre_cuenta' id='nombre_cuenta' className='px-2 mx-2 py-1 my-2 rounded-md'/>
                                        <ErrorMessage name="nombre_cuenta"/>
                                    </div>
                                    <div className="flex items-center justify-between pb-4">
                                        <div>
                                            <label htmlFor="tipo_cuenta" className="text-lg font-semibold px-2">Tipo de Cartera</label> 
                                            <Field as="select" name="tipo_cuenta" id="tipo_cuenta" className='text-gray-700 px-2 mx-2 mt-2 py-1 rounded-md'>
                                                <option value=""></option>
                                                <option value="Nomina">Nomina</option>
                                                <option value="Cuenta de cheques">Cuenta de Cheques</option>
                                                <option value="Credito">Credito</option>
                                                <option value="prestamo">Prestamo</option>
                                            </Field>
                                        </div>
                                        <div>
                                            <label htmlFor="color" className='text-lg font-semibold'>Color</label>
                                            <button 
                                            className={`w-28 h-7 bg-white mt-1 rounded-md flex ${saveColor ? 'justify-between' : 'justify-end' } pl-2 items-center mr-2 relative`}
                                            onClick={() => setOpenColors((prev: any) => !prev)}
                                            type='button'
                                            >
                                                {
                                                    saveColor &&
                                                    <>
                                                        <p className={`w-5 h-5 ${saveColor.tailwind} rounded-full`}></p>
                                                        <p className='text-md font-semibold'>{saveColor.color}</p>
                                                    </>
                                                }
                                                <ChevronDownIcon className='w-5 text-end '/>
                                            </button>
                                            {
                                                openColors &&
                                                <div className='flex flex-col w-28 bg-white justify-between items-center rounded-md absolute z-50 h-96 overflow-auto mt-1'>
                                                    {
                                                        colors.map((element: any) => {
                                                            return(
                                                                <button 
                                                                className='w-full flex justify-start gap-1 pl-1 py-1 items-center'
                                                                onClick={() => handlingSaveColor(element)}
                                                                key={element.color}
                                                                type='button'
                                                                >
                                                                    <p className={`w-5 h-5 ${element.tailwind} rounded-full`}></p>
                                                                    <p className='text-md font-semibold'>{element.color}</p>
                                                                </button>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            }
                                        </div>
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
                                    <button className='bg-red-500 w-full py-2 rounded-xl mt-2 hover:scale-105 transition duration-300' onClick={() => handlingCloseAddWallet()}>Cancelar</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div> 
            </div>
    )
}

export { CardAddWallet }