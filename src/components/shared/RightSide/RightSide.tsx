import Link from "next/link";
import Image from "next/image";
import './RightSide.css'

const RightSide = () => {
    return (
        <section className="w-screen h-screen flex">
          <div className="absolute -z-10 w-full h-full">
           <Image src={'/images/atardecer-blanco-negro-2.jpg'} width={5000} height={100} alt="portada" className="h-full w-full object-cover"/>
          </div>
          <div className="w-3/6 flex justify-center items-center effectoBlur rounded-r-2xl">
          <Image src={'/images/dark_logo_white_background.jpg'} width={300} alt="a-shop" height={500} className='z-10'/>
          </div>
          <nav className="w-3/6 items-center h-full flex justify-center">
            <ul className="flex flex-col gap-16 items-center">
              <Link href={'/about-us'}>
                <li className="text-2xl border border-white py-2 px-4 rounded-lg hover:bg-white/30 w-36 text-center font-semibold text-white">About us</li>
              </Link>
              <Link href={'/login'}>
                <li className="text-2xl border-white border py-2 px-4 rounded-lg hover:bg-white/30 w-36 text-center font-semibold text-white">Log In</li>
              </Link>
              <Link href={'/store'}>
                <li className="text-2xl border border-white py-2 px-4 rounded-lg hover:bg-white/30 w-36 text-center font-semibold text-white">Store</li>
              </Link>
            </ul>
          </nav>
        </section>
    )
}

export { RightSide }