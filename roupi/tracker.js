"use client";
import { useEffect } from "react";
import { useGET } from "./utils";
import { useStateContext } from "@/context/contextProvider";

export const useInitTracker = () => {
  const { setTrackID } = useStateContext();

  useEffect(() => {
    if (localStorage?.getItem("trackID")) {
      setTrackID(localStorage?.getItem("trackID"));
    }
    if (localStorage?.getItem("accept-cockies") == 1 && !localStorage?.getItem("trackID")) {
      useGET("tracking/init/").then((res) => {
        if (res.type == "success") {
          setTrackID(res.data);
          localStorage.setItem("trackID", res.data);
        }
      });
    }
    if (localStorage?.getItem("accept-cockies") == "0&0") {
      setTrackID("0&0");
      localStorage.setItem("trackID", "0&0");
    }
  }, []);
};
