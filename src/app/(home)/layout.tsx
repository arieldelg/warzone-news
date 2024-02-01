import { Description } from "app/components/Home/Description/Description";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {/* <Description/> */}
            { children }
        </div>
    )
}

export default HomeLayout 