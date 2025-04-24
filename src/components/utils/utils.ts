export const handleApiError = (error: any) => {
  let errorMessage = "An unexpected error occurred.";
  if (error.response?.data?.message)
    errorMessage = error.response?.data?.message;

  return errorMessage;
};
