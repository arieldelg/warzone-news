import Image from "next/image";
import Link from "next/link";

interface ProductCardInterface {
  product: ProductType
}

export const ProductCard = ({ product }: ProductCardInterface) => {
  return (
    <Link href={`/articulo/${product.handle}?id=${product.id}`} >
      <article >
        <Image
          src={product.image}
          alt={product.title}
          quality={80}
          height={320}
          width={320}
          loading="eager"
        />
        <div >
          <h3>{product.title}</h3>
        </div>
        <span >${product.price} USD</span>
      </article>
    </Link>
  );
};