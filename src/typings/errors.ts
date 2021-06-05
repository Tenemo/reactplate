export type RequestError = {
    status: number;
    statusText: string;
    data: {
        description?: string;
    };
};

export type UnknownError = RequestError | Error;
