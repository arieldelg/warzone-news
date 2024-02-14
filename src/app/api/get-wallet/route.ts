import { getData } from "app/services/MongoDB/actions/getData"

const GET = async () => {
    const data = await getData()
    return Response.json({ data })
}
export { GET }