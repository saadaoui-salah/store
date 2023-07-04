"use client";

import { useAddProductToCart } from "@/roupi/cart";
import { useProductInWishList } from "@/roupi/wish-list";
import { Stars } from "@/components/Stars";
import { SaveButton } from "@/components/shared/Buttons";
import { MEDIA_URL } from "@/urls";
import Image from "next/image";
import { ShippingCard } from "./ShippingCard";

const ProductDescription = ({ description }) => {
  return (
    <div className="py-10 text-gray-900 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
      {/* <!-- Description and details --> */}
      <p className="text-gray-900 font-bold mb-2">Description:</p>
      <p>{description}</p>
    </div>
  );
};

const Choice = ({ image, title, currentPack, addPackID, id }) => {
  return (
    <button
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        addPackID();
      }}
      className="w-16 h-20"
    >
      <label
        className={
          "group w-16 h-16 py-1 flex items-center justify-center rounded-md border text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm"
        }
      >
        <input
          type="radio"
          name="size-choice"
          value="M"
          className="sr-only"
          aria-labelledby="size-choice-3-label"
        />
        {/* <!--
              Active: "border", Not Active: "border-2"
              Checked: "border-indigo-500", Not Checked: "border-transparent"
        --> */}
        <Image
          src={MEDIA_URL + image?.replace("/media/", "")}
          width={60}
          height={60}
          alt="Pack"
          id="size-choice-3-label"
          className={`pointer-events-none  ${
            id == currentPack && "ring-2 ring-indigo-500"
          } w-16 h-16 -inset-px rounded-md`}
        />
      </label>
      <p
        id="size-choice-3-label"
        className={`text-center mt-2 ${
          currentPack == id ? "text-indigo-500" : "text-gray-900"
        } font-bold`}
      >
        {title || "M"}
      </p>
    </button>
  );
};

const NotAvialableChoice = () => {
  return (
    <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-not-allowed bg-gray-50 text-gray-200">
      <input
        type="radio"
        name="size-choice"
        value="XXS"
        disabled
        className="sr-only"
        aria-labelledby="size-choice-0-label"
      />
      <span id="size-choice-0-label">XXS</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
      >
        <svg
          className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          stroke="currentColor"
        >
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </span>
    </label>
  );
};

export const ProductChoices = ({ packs, packID, addPackID }) => {
  return (
    <div className="min-w-[200px]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">
          {packs?.name || "size"}
        </h3>
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Size guide
        </a>
      </div>

      <fieldset className="mt-4">
        <div className="flex flex-wrap gap-4 w-full">
          {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
          <NotAvialableChoice />
          {packs?.map((pack) => (
            <Choice
              key={pack.id}
              id={pack.id}
              currentPack={packID}
              addPackID={() => addPackID(pack.id)}
              image={pack.image}
              title={pack.title}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export const ProductDetailsCard = ({
  title,
  price,
  stars,
  starsCount,
  description,
  discount,
  id,
  shipping,
  packs,
}) => {
  if (!id) return <p>Loading</p>;
  const acctualPrice = price - (discount * price) / 100;
  const { handleAddToWishList, added } = useProductInWishList(id);
  const { handleAddProductToCart, order, setOrder } = useAddProductToCart(id);
  return (
    <>
      <div className="block pt-16  md:px-6 w-[400px]">
        <div className="block lg:pr-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h1>
            <SaveButton saved={added} onClick={() => handleAddToWishList()} />
          </div>

          <div>
            <p className="mt-4 tracking-tight flex text-gray-900">
              <div className="flex text-3xl font-bold text-gray-900">
                {discount ? acctualPrice.toFixed(2) : price}
                <div className="text-3xl font-bold text-gray-900">DA</div>
              </div>
              {discount ? (
                <div className="px-2 text-xl self-end  line-through text-gray-500">
                  {price} DA
                </div>
              ) : (
                ""
              )}
            </p>
            {starsCount > 0 ? (
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <Stars num={stars} />
                  <span className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {starsCount} review{starsCount > 1 && "s"}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 font-bold text-md mt-2">
                Not rated yet
              </p>
            )}
          </div>
        </div>
        <ProductDescription description={description} />
      </div>

      <form className="pt-16  max-w-[400px]">
        {/* <!-- Sizes --> */}
        <ProductChoices
          packs={packs}
          packID={order?.packID}
          addPackID={(id) =>
            setOrder((prev) => ({
              ...prev,
              packID: prev.packID === id ? null : id,
            }))
          }
        />
        <div className="mt-10 w-full">
          <ShippingCard
            shippingValue={order?.shippingID}
            shipping={shipping}
            addShipping={(id) =>
              setOrder((prev) => ({ ...prev, shippingID: id }))
            }
          />
        </div>
        <button
          onClick={(e) => handleAddProductToCart(e, packs.length > 0)}
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add to bag
        </button>
      </form>
    </>
  );
};
