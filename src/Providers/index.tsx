
import { PropsWithChildren } from "react";
import  { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";



const Providers = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
     
        {children}
        <Toaster />
      
    
    </BrowserRouter>
  );
};

export default Providers;
