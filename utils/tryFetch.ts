import { CustomError, handleError } from "@/models/Error";
import { NextResponse } from "next/server";

export const call = async (f: CallableFunction) => {
  try {
    const res = await f();
    return NextResponse.json(res);
  } catch (error) {
    const e = handleError(error);
    return NextResponse.json({ error: e }, { status: e.code });
  }
};
