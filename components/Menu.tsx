"use client";

import { goTo } from "@/controllers/location";
import { Coordinates } from "@/controllers/storage";
import { Location } from "@/models/Location";
import { Close } from "@mui/icons-material";
import { debounce } from "lodash";
import Loader from "react-spinners/PuffLoader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface MenuProps {
  onClose?: () => void;
  open: boolean;
}
const findCities = async (city: string) => {
  const url = `${window.location.origin}/api/city?q=${city}`;
  const res = await fetch(url);
  const { cities } = await res.json();
  return cities as Location[];
};

export default function Menu({ onClose, open }: MenuProps) {
  const hide = open ? undefined : "hidden ";
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState<Location[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const fetch = async () => {
    console.log("fetching");
    setCities([]);
    setIsLoading(true);
    const cities = await findCities(search);
    setCities(cities);
    setIsLoading(false);
  };

  const debouncedFetch = debounce(fetch, 1000);

  const reset = () => {
    setCities([]);
    setSearch("");
    onClose?.();
  };

  const handleSelection = (coords: Coordinates) => {
    goTo(router, coords);
    reset();
  };

  useEffect(() => {
    if (search.length > 0) debouncedFetch();
    return () => debouncedFetch.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div
      className={`bg-secondary h-full w-full fixed sm:absolute top-0 left-0 z-10  p-6 md:p-14 ${hide} overflow-y-auto`}
    >
      <div className=" flex flex-row justify-between items-center gap-6">
        <input
          placeholder="City"
          className="w-full h-[50px] rounded p-4 max-w-smA"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetch();
          }}
        />
        {onClose && (
          <button
            className="text-white bg-primary w-12 h-12 rounded-full shrink-0"
            onClick={onClose}
          >
            <Close />
          </button>
        )}
      </div>

      {isLoading && (
        <div className="flex mt-[50%] justify-center items-center">
          <Loader color="white" size={"3rem"} />
        </div>
      )}

      {cities?.length > 0 && (
        <div className="flex flex-col gap-4 mt-8 flex-grow">
          {cities.map(({ city, longitude: lon, latitude: lat, state }) => {
            return (
              <button
                key={lat + lon}
                className="border-[0.5px] border-opacity-20 w-full h-fit text-white-light text-left p-3 rounded"
                onClick={() => handleSelection({ lat, lon })}
              >
                <h1 className="text-lg text-bold text-white">{city}</h1>
                {state && <h2 className="text-sm">{state}</h2>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
