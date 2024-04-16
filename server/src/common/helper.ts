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

const handleResponseFormat = (data: any, projections = []): Promise<any> => {
  if (!data) {
    return Promise.resolve(null);
  }
  if (data.toObject) {
    data = data.toArray();
  }
  if (data.toJSON) {
    data = data.toJSON();
  }

  for (let i = 0; i < projections.length; i++) {
    if (data[projections[i]]) {
      delete data[projections[i]];
    }
  }

  const { createdAt, updatedAt, _id, __v, ...rest } = data;

  return {
    ...rest,
    created_at: createdAt,
    updated_at: updatedAt,
    id: _id,
  };
};

export { handleAsyncRequest, handleResponseFormat };
