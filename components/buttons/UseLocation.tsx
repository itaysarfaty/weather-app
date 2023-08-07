"use client";
import { getStorage } from "@/controllers/storage";
import { goToCurrent, goToSaved } from "@/controllers/location";
import { MyLocation } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { isError } from "@/models/Error";

export default function UseLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const [hide, setHide] = useState(false);

  const handleLocationError = (error: unknown) => {
    if (isError(error)) {
      const { code } = error;
      if (code === 404 || code === 403) {
        alert(error.message);
        setHide(true);
      }
    }
  };

  // When component mounts
  useEffect(() => {
    const { current } = getStorage();
    const fetch = async () => {
      try {
        if (current) goToSaved(router);
        else await goToCurrent(router);
      } catch (error) {
        handleLocationError(error);
      }
    };
    if (params.get("lat") && params.get("lon")) return;
    fetch();
  }, []);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await goToCurrent(router);
    } catch (error) {
      handleLocationError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-primary text-white  w-[45px] h-[45px] rounded-full text-bold`}
      style={{ display: hide ? "none" : "block" }}
    >
      <MyLocation className={isLoading ? "animate-pulse" : undefined} />
    </button>
  );
}
