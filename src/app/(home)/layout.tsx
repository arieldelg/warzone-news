import { Navbar } from "app/components/shared/Navbar/Navbar";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions)
    if(!session) {
        redirect('/login')
    }
    return (
        <main className=" w-full h-screen flex justify-center">
            {
                session &&
                <>
                    <Navbar/> 
                    <div className="ml-60 w-full h-full">
                        { children }
                    </div>
                </>
            }
        </main>
    )
}

export default HomeLayout 