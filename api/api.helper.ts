export const getContentType = () => ({
    "Content-Type": "application/json"
});
export const getContentTypeMultiPartFormData = () => ({
    "Content-Type": "multipart/form-data"
});

export const errorCatch = (error: any): string => {
    const message = error?.response?.data?.message;
    return message;
    // ? typeof error.responce.data.message === 'object'
    //     ? message[0]
    //     : message
    // : error.error
};
