import { env } from "app/config/env"
import { createConnection } from "mongoose"

const getDataMetrics = () => {
    const connection = createConnection(env.MONGO_DB_POST_WALET!)
    return connection
}

export { getDataMetrics }