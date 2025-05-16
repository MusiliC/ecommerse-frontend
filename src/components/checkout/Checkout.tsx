import { Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import AddressInfo from "./AddressInfo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAddressAction } from "@/redux/actions/AddressAction";
import { Button } from "../ui/button";

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useAppDispatch();
  const { selectedCheckoutAddress } = useAppSelector((state) => state.address);

  const paymentMethod = {
    home: "K",
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

  useEffect(() => {
    dispatch(getAddressAction());
  }, [dispatch]);

  return (
    <div className="py-14 min-h-[calc(100vh-100px)] px-4">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-5 ">{activeStep === 0 && <AddressInfo />}</div>

      <div
        className="flex justify-between items-center px-4 fixed z-50 h-24 bottom-0  left-0 w-full py-4 border-slate-200"
        style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0,15)" }}
      >
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>

        {activeStep !== steps.length - 1 && (
          <Button
            onClick={handleNext}
            disabled={
              activeStep === 0
                ? !selectedCheckoutAddress
                : activeStep === 1
                ? !paymentMethod
                : false
            }
          >
            Proceed
          </Button>
        )}
      </div>
    </div>
  );
}

export default Checkout;
