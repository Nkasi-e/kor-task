import InternalServerError from "../error/InternalServerError";

const handleAsyncRequest = async (execution: any): Promise<any> => {
  const response = await execution.catch((e: Error) => ({ error: e }));
  if (response && response.erorr) {
    console.log(
      "Error while executing request \n",
      JSON.stringify(response.error)
    );
    throw new InternalServerError(
      "Server error! Could not complete the request due to due unknown error."
    );
  }
  return response;
};

export { handleAsyncRequest };
