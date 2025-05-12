import { AddressType } from "@/types/AddressSchema";
import {
  Building,
  CheckCircle,
  Edit,
  Globe,
  TowerControl,
  Trash,
} from "lucide-react";

type addressListProps = {
  address: AddressType[];
  setSelectedAddress: (address: AddressType) => void;
  setIsOpen: (val: boolean) => void;
};

function AddressList({
  address,
  setSelectedAddress,
  setIsOpen,
}: addressListProps) {
  const selectedAddress: AddressType = address[0];

  const handleAddressSelection = (item: AddressType) => {
    setSelectedAddress(item);
  };

  const handleEdit = (item: AddressType) => {
    setSelectedAddress(item);
    setIsOpen(true)
  };

  const handleDelete = (item: AddressType) => {
    setSelectedAddress(item);
  };

  return (
    <div>
      {address.map((item) => (
        <div
          key={item.addressId}
          onClick={() => handleAddressSelection(item)}
          className={`p-4 border rounded-md cursor-pointer relative ${
            selectedAddress?.addressId === item.addressId
              ? `bg-green-100`
              : "bg-white"
          }`}
        >
          <div className="flex flex-col  items-start">
            <div className="flex items-center my-2">
              <p className="flex gap-2 font-semibold items-center">
                <Building /> {item.building}{" "}
              </p>
              {selectedAddress?.addressId === item.addressId && (
                <CheckCircle className="text-green-500" />
              )}
            </div>
            <div className="flex items-center my-2">
              <p className="flex gap-2  items-center">
                <TowerControl /> {item.street}{" "}
              </p>
            </div>
            <div className="flex items-center my-2">
              <p className="flex gap-2  items-center">
                <Globe /> {item.city}, {item.country}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <Edit
                className="text-blue-800"
                onClick={() => handleEdit(item)}
              />
            </div>
            <div>
              <Trash
                className="text-red-700"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddressList;
