"use client";
import { Gallery } from "@/components/Gallery";
import { ProductDetailsCard } from "@/components/ProductDetailsCard";
import { useGetProducts } from "@/roupi/product";

export default function ProductDetails({ params }) {
  const { id } = params;
  if (!id) return <p>Loading</p>;
  const { products: product } = useGetProducts({ filter: `id/${id}/` });

  return (
    <section className="px-6 md:px-20 lg:px-34">
      <div className="px-6 flex flex-wrap py-8 mb-4  w-full justify-center">
        <Gallery images={product?.images} />
        <ProductDetailsCard
          id={product?.id}
          price={product?.price}
          stars={product?.reviews_avg}
          starsCount={product?.reviews}
          description={product?.description}
          discount={product?.discount_value}
          packs={product?.packs}
          title={product?.title}
          shipping={product?.shipping}
        />
      </div>
    </section>
  );
}
