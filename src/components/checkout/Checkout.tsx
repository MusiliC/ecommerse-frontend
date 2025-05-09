import { Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import AddressInfo from "./AddressInfo";
import { useAppDispatch } from "@/redux/hooks";
import { getAddressAction } from "@/redux/actions/AddressAction";

function Checkout() {
  const [activeStep] = useState(0);

  const dispatch = useAppDispatch();

  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

  useEffect(() => {
    dispatch(getAddressAction())
  },[dispatch])

  return (
    <div className="py-14 min-h-[calc(100vh-100px)] px-4">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-5 ">
        {activeStep === 0 && <AddressInfo />}
      </div>
    </div>
  );
}

export default Checkout;
