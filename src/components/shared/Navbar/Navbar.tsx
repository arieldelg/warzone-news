'use client'
import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"


const Navbar = () => {
    const { data: session } = useSession()
    return (
        <nav className="w-60 h-full px-6 border-r-2  bg-white fixed top-0 left-0 z-50">
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
            <Link href={'/store'}>
                <li className="px-2 pt-4 pb-3">Accounts</li>
            </Link>
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