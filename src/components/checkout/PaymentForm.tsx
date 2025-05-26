import { Skeleton } from "@mui/material";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "../ui/button";



interface PaymentFormProps {
  clientSecret: string;
  totalPrice: number;
}

const PaymentForm = ({ clientSecret, totalPrice }: PaymentFormProps) => {

  const stripe = useStripe();
  const elements = useElements();
  const [loading] = useState(false);
  const [errorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your payment logic here
  };

  const paymentElementOptions = {
    layout: "tabs",
  };



  return (
    <form onSubmit={handleSubmit}>
      {loading ? (
        <Skeleton />
      ) : (
        <div>
          {clientSecret && <PaymentElement options={paymentElementOptions} />}
          {errorMessage && <p className="text-red-500 mt-2"> {errorMessage}</p>}

          <div className="my-5 w-full">
            <Button className="w-full" disabled={!stripe || loading}>
              {!loading ? `Pay ksh ${totalPrice.toFixed(2)}` : "Processing..."}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default PaymentForm;
