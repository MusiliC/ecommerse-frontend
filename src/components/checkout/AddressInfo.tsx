import { Skeleton } from "@mui/material";
import AddressInfoModal from "../address/AddressInfoModal";
import { useEffect } from "react";

function AddressInfo() {
  const noAddressExist = true;
  const isLoading = false;

  useEffect(() => {

  },[])

  return (
    <div className="pt-4">
      {noAddressExist ? (
        <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
          <h1 className="text-slate-800 text-center font-bold text-2xl">
            Please add your address to complete purchase
          </h1>
          <div className="my-5">
            <AddressInfoModal />
          </div>
        </div>
      ) : (
        <div className="relative p-6 rounded-lg max-w-md mx-auto">
          <h1 className="text-slate-800 text-center font-bold text-2xl">
            Select Address
          </h1>
          {isLoading ? (
            <div className="py-4 px-8 ">
              <Skeleton />{" "}
            </div>
          ) : (
            <div className="space-y-4 pt-6">
              <p>Address List here...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddressInfo;
