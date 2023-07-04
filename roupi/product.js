"use client";

import { useEffect, useState } from "react";
import { useGET } from "./utils";
import { useStateContext } from "@/context/contextProvider";

export const useGetProducts = ({ params, filter }) => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(true);
  const { handleNotification, trackID } = useStateContext();
  useEffect(() => {
    setLoading(true);
    useGET(`products/${filter || ""}`, {
      data: params,
      offset: offset,
      headers: { "X-Comercify-Visitor": trackID },
    }).then((res) => {
      if (res?.type == "error") handleNotification(res);
      if (res?.type == "success") {
        setProducts(res?.data);
        setOffset(1);
      }
      setLoading(false);
    });
  }, [params]);

  useEffect(() => {
    setLoading(true);
    useGET(`products/${filter || ""}`, {
      params: { ...params, offset: offset },
      headers: { "X-Comercify-Visitor": trackID },
    }).then((res) => {
      if (res?.type == "error") handleNotification(res);
      if (res?.type == "success") {
        if (offset > 1) {
          setProducts((p) => [...p, ...res?.data]);
        } else {
          setProducts(res?.data);
        }
      }
      setLoading(false);
    });
  }, [offset]);
  return { products, setOffset, loading };
};
