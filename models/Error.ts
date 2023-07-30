export interface CustomError {
  message: string;
  code: number;
}

export function isError(object: any): object is CustomError {
  const keys = Object.keys(object);
  const errorKeys = ["message", "code"];
  return errorKeys.every((key) => keys.includes(key));
}

export const handleError = (error: any) => {
  console.log("Handle Error Called");
  if (isError(error)) {
    return error;
  } else {
    console.log(error);
    return NewError("Internal Server Error", 500);
  }
};

export const NewError = (message: string, code: number): CustomError => {
  return { message, code };
};
