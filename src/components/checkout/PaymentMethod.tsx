import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addPaymentMethod } from "@/redux/reducers/paymentMethodReducer";

function PaymentMethod() {
  const { paymentMethod } = useAppSelector((state) => state.paymentMethod);
  const dispatch = useAppDispatch();

  const handlePaymentMethod = (value: string) => {
    dispatch(addPaymentMethod(value));
  };

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
