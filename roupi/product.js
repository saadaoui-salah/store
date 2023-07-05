"use client";

import { useEffect, useState } from "react";
import { useGET } from "./utils";
import { useStateContext } from "@/context/contextProvider";

export const useGetProducts = ({ filter }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    useGET(`products/${filter || ""}`, {}).then((res) => {
      if (res?.type == "success") {
        setProducts(res?.data);
      }
      setLoading(false);
    });
  }, []);
  return { products, loading };
};
