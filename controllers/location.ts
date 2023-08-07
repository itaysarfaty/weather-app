import { NewError } from "@/models/Error";
import { Coordinates, getStorage, setStorage } from "./storage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const getCurrentCord = async (): Promise<Coordinates> => {
  try {
    const location = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );

    const { coords } = location;
    return { lat: coords.latitude, lon: coords.longitude };
  } catch (error) {
    if (error instanceof GeolocationPositionError) {
      if (error.code === 1)
        throw NewError("Please enable permission for geolocation.", 403);
      if (error.code === 2) throw NewError("Location unavailable", 404);
      if (error.code === 3)
        throw NewError(
          "Timed-out while trying to get your current location.",
          408
        );
    }
    throw NewError("Unknown Error: Can't get current location", 500);
  }
};

export const goToCurrent = async (router: AppRouterInstance) => {
  const coords = await getCurrentCord();
  setStorage(coords);
  const query = formatQuery(coords);
  router.push(query);
};

export const goToSaved = (router: AppRouterInstance) => {
  const { current } = getStorage();
  if (!current) throw NewError("No saved location", 404);
  const query = formatQuery(current);
  router.push(query);
};

export const goTo = (router: AppRouterInstance, coords: Coordinates) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    setStorage(coords);
  }

  const query = formatQuery(coords);
  router.push(query);
};

export const formatQuery = ({ lat, lon }: Coordinates) => {
  return `?lat=${lat}$&lon=${lon}`;
};
