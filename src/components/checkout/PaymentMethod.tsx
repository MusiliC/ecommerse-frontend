/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createUserCart } from "@/redux/actions/CartAction";
import { useAppDispatch } from "@/redux/hooks";
import { addPaymentMethod } from "@/redux/reducers/paymentMethodReducer";
import { useEffect } from "react";


interface PaymentMethodProps {
  cart: Array<any>;
  cartId?: string;
  paymentMethod: string;
}

function PaymentMethod({ cart, cartId, paymentMethod }: PaymentMethodProps) {
  const dispatch = useAppDispatch();

  const handlePaymentMethod = (value: string) => {
    dispatch(addPaymentMethod(value));
  };

  useEffect(() => {
    if (cart.length > 0 && !cartId) {
      const sendCartItems = cart.map((item) => {
        return {
          productId: item.item.productId,
          quantity: item.quantity,
        };
      });

      dispatch(createUserCart(sendCartItems));
    }
  }, [cart, cartId, dispatch]);

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border">
      <h1 className="text-2xl font-semibold mb-4">Select Payment Method</h1>
      <div className="my-5">
        <RadioGroup
          defaultValue={paymentMethod}
          value={paymentMethod}
          onValueChange={handlePaymentMethod}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mpesa" id="mpesa" />
            <Label htmlFor="mpesa">M-Pesa</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="stripe" id="stripe" />{" "}
            <Label htmlFor="stripe">Visa/Mastercard</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default PaymentMethod;
