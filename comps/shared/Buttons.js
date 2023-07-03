"use client";
import { OpenMenuIcon, CloseMenuIcon } from "./Icons";

export const MobileMenuButtons = ({ onclick, open }) => {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <button
        onClick={() => onclick()}
        type="button"
        id="dropdownBtn"
        className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        {open ? <OpenMenuIcon /> : <CloseMenuIcon />}
      </button>
    </div>
  );
};
