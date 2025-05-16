import { Skeleton } from "@mui/material";
import AddressInfoModal from "../address/AddressInfoModal";
import {  useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import AddressList from "./AddressList";
import { AddressType } from "@/types/AddressSchema";

function AddressInfo() {

  const { address, isLoading, selectedCheckoutAddress } = useAppSelector(
    (state) => state.address
  );
  
  const [selectedAddress, setSelectedAddress] = useState<AddressType | undefined>();
   const [isOpen, setIsOpen] = useState(false);

  const noAddressExist = !address || address.length === 0; 


  return (
    <div className="pt-4">
      {noAddressExist ? (
        <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
          <h1 className="text-slate-800 text-center font-bold text-2xl">
            Please add your address to complete purchase
          </h1>
          <div className="my-5">
            <AddressInfoModal
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              selectedCheckoutAddress={selectedCheckoutAddress}
            />
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
              <AddressList
                address={address}
                setSelectedAddress={setSelectedAddress}
                setIsOpen={setIsOpen}
              />
              {address.length > 0 && (
                <div className="flex items-center justify-center">
                  <AddressInfoModal
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    selectedCheckoutAddress={selectedCheckoutAddress}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

    
    </div>
  );
}

export default AddressInfo;
