export interface CustomError {
  message: string;
  statusCode: number;
}

export function isError(object: any): object is CustomError {
  return "message" in object && "statusCode" in object;
}

export const handleError = (error: any) => {
  if (isError(error)) {
    return error;
  } else {
    console.log(error);
    return {
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};

export const NewError = (message: string, statusCode: number): CustomError => {
  return { message, statusCode };
};
