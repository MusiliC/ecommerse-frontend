import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import  { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";


const queryClient = new QueryClient();
const Providers = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default Providers;
