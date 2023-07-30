import { NewError } from "@/models/Error";
import { findCity } from "@/controllers/city";
import { NextRequest, NextResponse } from "next/server";
import { call } from "@/utils/tryFetch";

const validate = (city: string | null) => {
  if (!city) throw NewError("City not given", 400);
  return city;
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const fetch = async () => {
    const city = validate(searchParams.get("q"));
    return await findCity(city);
  };

  return call(fetch);
};
