import { handleError } from "@/models/Error";
import { NextResponse } from "next/server";

export const call = async (f: CallableFunction) => {
  try {
    return await f();
  } catch (error) {
    const e = handleError(error);
    return NextResponse.json(e.message, { status: e.statusCode });
  }
};
