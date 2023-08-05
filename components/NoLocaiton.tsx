"use client";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStorage } from "@/controllers/storage";
import { goToCurrent, goToSaved } from "@/controllers/location";
import { isError } from "@/models/Error";
import Loader from "react-spinners/PuffLoader";

export default function NoLocation() {
  const router = useRouter();
  const params = useSearchParams();
  const { current } = getStorage();
  const [gettingCurrent, setGettingCurrent] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (params.get("lat") && params.get("lon")) return;
      if (current) {
        await goToSaved(router);
      } else {
        try {
          setGettingCurrent(true);
          await goToCurrent(router);
        } catch (error) {
          if (isError(error)) {
            alert(error.message);
          }
        } finally {
          setGettingCurrent(false);
        }
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col  md:flex-row">
      <div className="bg-secondary h-screen md:w-[450px]">
        <div className="flex flex-col h-full relative gap-6">
          {gettingCurrent ? (
            <div className="flex flex-col h-full w-full items-center justify-center text-center gap-6">
              <Loader color="white" />
              <h1 className="text-white"> Getting your location</h1>
            </div>
          ) : (
            <Menu open={true} />
          )}
        </div>
      </div>
      <main className="bg-primary h-full flex-grow md:h-screen p-14 overflow-y-auto flex flex-col justify-between gap-12">
        <h5 className="text-white-light text-sm">
          By
          <a
            className="underline underline-offset-8 hover:text-white"
            href="https://www.linkedin.com/in/itaysarfaty/"
          >
            {" Itay Sarfaty "}
          </a>
          for devChallenges.io
        </h5>
      </main>
    </div>
  );
}
