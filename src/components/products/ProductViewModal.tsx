import { FaCheckCircle } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { XCircle } from "lucide-react";
import { ProductType } from "@/types";
import { StatusBadge } from "../shared/Status";
import { Button } from "../ui/button";

type ProductViewModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  product: ProductType;
  isAvailable: boolean;
};

function ProductViewModal({
  isOpen,
  setIsOpen,
  product,
  isAvailable,
}: ProductViewModalProps) {
  const { productName, image, description, price, specialPrice } = product;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl p-6 rounded-2xl shadow-lg bg-white">
        <DialogHeader className="space-y-4">
          {image && (
            <div className="w-full aspect-[3/2] rounded-xl overflow-hidden flex justify-center bg-gray-100">
              <img
                src={image}
                alt={productName}
                loading="lazy"
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <DialogTitle className="text-slate-800 font-bold text-2xl lg:text-3xl ">
            {productName}
          </DialogTitle>

          <DialogDescription>
            <div className="flex justify-between items-center text-lg font-medium text-gray-700">
              <div>
                {specialPrice ? (
                  <div className="flex items-center space-x-2">
                    <span className="line-through text-gray-400">
                      KES {price.toFixed(2)}
                    </span>
                    <span className="text-red-600 font-bold">
                      KES {specialPrice.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-green-700 font-semibold">
                    KES {price.toFixed(2)}
                  </span>
                )}
              </div>
              <StatusBadge
                text={isAvailable ? "Available" : "Stock Out"}
                color={isAvailable ? "green" : "red"}
                icon={
                  isAvailable ? (
                    <FaCheckCircle className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )
                }
              />
            </div>
          </DialogDescription>

          <hr className="my-4 border-gray-200" />

          <DialogDescription className="text-gray-600 text-sm leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          {isAvailable && <Button>Add to Cart</Button>}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductViewModal;
