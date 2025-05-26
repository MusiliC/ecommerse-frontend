import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../checkout/PaymentForm";
import { useEffect } from "react";
import { createStripePaymentSecret } from "@/redux/actions/CartAction";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function StripePayment() {
  const dispatch = useAppDispatch();
  const { clientSecret } = useAppSelector((state) => state.cart);
  const { totalPrice } = useAppSelector((state) => state.cart);

  console.log(clientSecret);
  console.log(totalPrice);
  
  useEffect(() => {
    if (!clientSecret) {
      dispatch(createStripePaymentSecret(totalPrice));
    }
  }, [clientSecret, dispatch, totalPrice]);
  return (
    <div className="max-w-3xl mt-20 mx-auto">
 
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </div>
  );
}

export default StripePayment;
