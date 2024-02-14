
import { connectWallet } from "./model";


const postWallet = async (object: any) => {
    try {
        const Wallet = connectWallet()
        const data = await Wallet.create(object)
        if (data) {   
            console.log('connected to post-wallet')
        }
    } catch (error) {
        return console.log(error, 'error en post wallet')
    }
}

export { postWallet }



