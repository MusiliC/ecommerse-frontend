export const handleApiError = (error: any) => { 

  console.log(error);
  
  
  if (typeof error === "string") return error;
  if (error?.response?.data?.data) return error.response.data.data;
  if (error?.message) return error.message;
  return "An unexpected error occurred.";
};
