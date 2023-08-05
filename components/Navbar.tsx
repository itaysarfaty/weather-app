"use client";
import { useState } from "react";
import Search from "./buttons/Search";
import UseLocation from "./buttons/UseLocation";
import Menu from "./Menu";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`flex flex-row items-center justify-between pt-6 px-6 md:pt-14 md:px-14 `}
      >
        <Search onClick={() => setOpen(true)} />
        <UseLocation />
      </div>
      <Menu onClose={() => setOpen(false)} open={open} />
    </>
  );
}
