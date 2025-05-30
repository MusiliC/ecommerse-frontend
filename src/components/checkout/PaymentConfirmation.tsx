import { stripePaymentConfirm } from "@/redux/actions/CartAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom"


function PaymentConfirmation() {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const dispatch = useAppDispatch();
    const { cart } = useAppSelector((state) => state.cart);
    const [loading] = useState(false)


    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");


    useEffect(() => {
        if(paymentIntent && clientSecret && redirectStatus && cart ){
            const sendData = {
                addressId: 1,
                pgName: "Stripe",
                pgPaymentId: paymentIntent,
                pgStatus: "succeeded",
                pgResponseMessage: "Payment Successful"
            }
            dispatch(stripePaymentConfirm(sendData))
        }
    },[paymentIntent, clientSecret, redirectStatus, cart, dispatch])

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}

      <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto" >
        <div className="text-green-500 mb-4 flex justify-center">
            <FaCheckCircle size={64}/>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful</h2>
        <p>Thank you for your purchase</p>
      </div>
    </div>
  );
}

export default PaymentConfirmation