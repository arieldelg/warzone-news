'use client'
import Link from "next/link"
import Image from "next/image"
import {  useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { getServerSession } from "next-auth"
import authOptions from "app/app/api/auth/[...nextauth]/options"

const cuentas = ['ariel', 'beto']

const Navbar = () => {
    const { data: session } = useSession()
    const [open, setOpen] = useState(false)
    const openMenu = () => {
        setOpen(prev => !open)
    }
    return (
        <nav className="w-60 h-full px-6 border-r-2  bg-white fixed top-0 left-0">
        <figure className="py-2 w-full flex justify-center">
            <Image src={'/images/dark_logo_white_background.jpg'} width={100} height={100} alt="logo"/>
        </figure>
        <h1> {session ? `Bienvenido ${session?.user?.name}` : null}</h1>
        <ul>
            {
                !session &&
                <Link href={'/login'}>
                    <li className={`${!session? 'border-y-2' : null} py-2 px-2`}>Login</li>
                </Link>
            }
            {
                session &&
                <Link href={'/login'}>
                    <button 
                    className={`${session? 'border-y-2' : null} py-2 px-2 w-full text-start`} 
                    onClick={(e) => {
                        e.preventDefault()
                        signOut({ callbackUrl: '/login'})
                        }}>Logout</button>
                </Link>
            }
            <div className="flex justify-between items-center pt-3 pb-2">
                <div className="flex cursor-pointer gap-1" >
                    <ChevronRightIcon 
                    className={`w-6  ${open ? 'rotate-90 transition duration-200' : 'rotate-0 transition duration-200'} `} 
                    onClick={() => setOpen(prev => !open)}
                    />
                    <li className="">Accounts</li>
                </div>
                <PlusCircleIcon className="w-6 cursor-pointer"/>
            </div>
            {
                open &&
                cuentas.map(element => {
                    return(
                        <p key={element} className="pl-7 py-1">{element}</p>
                    )
                })
            }
            <Link href={'/calendar'}>
                <li className="px-2 pb-2">Calendar</li>
            </Link>
            <Link href={'/records'}>
                <li className="px-2 py-2">Records</li>
            </Link>
            <Link href={'/about-us'}>
                <li className="px-2 py-2">About us</li>
            </Link>
            <Link href={'/test'}>
                <li className="px-2 py-2">This is a link test</li>
            </Link>
        </ul>
    </nav>
    )
}

export { Navbar }