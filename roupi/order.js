"use client";

import { useStateContext } from "@/context/contextProvider";
import { usePOST } from "./utils";

export const useCreateOrder = () => {
  const { handleNotification, token, trackID } = useStateContext();
  const submit = (e, data) => {
    e.preventDefault();

    usePOST("order/create/", {
      data: data,
      headers: {
        Authorization: token.access,
        "X-Comercify-Visitor": trackID,
      },
    }).then((res) => {
      if (res?.type == "success") handleNotification(res);
      if (res?.type == "error") handleNotification(res);
    });
  };
  return { submit };
};
