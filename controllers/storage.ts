export interface Coordinates {
  lat: number;
  lon: number;
}

export interface LocalStorage {
  current?: Coordinates;
}

export const getStorage = () => {
  const data = localStorage.getItem("coordinates");
  const parseData = data ? JSON.parse(data) : { current: undefined };
  return parseData as LocalStorage;
};
export const setStorage = (location: Coordinates) => {
  localStorage.setItem(
    "coordinates",
    JSON.stringify({
      current: location,
    })
  );
};
