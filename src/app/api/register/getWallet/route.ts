import { getData } from "app/services/MongoDB/actions/getData"


const POST = async () => {
    const data: any = await getData()
    return Response.json({ data })
}

export { POST }