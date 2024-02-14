import { HomeHeader } from "app/components/store/Header/HomeHeader"
import { WalletCard } from "app/components/store/Wallet/Accounts/WalletCard"

const Store = async () => {
   
    return (
        <div className="w-full px-4 pt-4 relative">
            <WalletCard/>
            <HomeHeader/>
        </div>
    )
}

export default Store