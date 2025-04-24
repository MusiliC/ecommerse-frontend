import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import  { Toaster } from "react-hot-toast";


const queryClient = new QueryClient();
const Providers = ({ children }: PropsWithChildren) => {
  return (
        
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
 
  );
};

export default Providers;
