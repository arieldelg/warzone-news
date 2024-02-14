// import authOptions from "app/app/api/auth/[...nextauth]/options"
// import { connectWallet } from "../post-wallet/model"
// import { getServerSession } from "next-auth"

// const getWallet = async () => {
//     const session = await getServerSession(authOptions)
    
//     try {
//         if (session?.accesToken) {
//             const response = await fetch('http://localhost:3000/api/user', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type':'application/json',
//                     'Authorization': `${session?.accesToken}`
//                 },
//             })
//             if (!response.ok) {
//                 return Response.json({ error: true })
//             }
//         }
//         const data = await connectWallet().find({ user_id: session?._id }).exec()
//         return data
//     } catch (error) {
//         return Response.json({ error: true })
//     }
// }

// export { getWallet }