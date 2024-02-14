// si una pagina es de tipo cliente, todas las paginas anidadas se vueleven de tipo cliente
import { MainProducts } from "app/components/Home/MainProducts/MainProducts";
import { RightSide } from "app/components/shared/RightSide/RightSide";
import { LeftSide } from "app/components/shared/LeftSide/LeftSide";


export default function Home() {
  
  return (
    <main className="w-screen h-screen flex">
      {/* <LeftSide/> */}
      <RightSide/>
      {/* <MainProducts/> */}
    </main>
  );
}
