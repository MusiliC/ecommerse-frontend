import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import AddressAddForm from "./AddressAddForm";
import { addressSchema, AddressType } from "@/types/AddressSchema";
import { useAppDispatch } from "@/redux/hooks";
import {
  createAddressAction,
  getAddressAction,
  updateAddressAction,
} from "@/redux/actions/AddressAction";
import { useEffect } from "react";

type modalProps = {
  setIsOpen: (val: boolean) => void;
  isOpen: boolean;
  selectedCheckoutAddress: AddressType;
};

function AddressInfoModal({
  setIsOpen,
  isOpen,
  selectedCheckoutAddress,
}: modalProps) {
  const dispatch = useAppDispatch();

  const form = useForm<AddressType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressId: selectedCheckoutAddress?.addressId ?? undefined,
      street: selectedCheckoutAddress ? selectedCheckoutAddress.street : "",
      building: selectedCheckoutAddress ? selectedCheckoutAddress.building : "",
      city: selectedCheckoutAddress ? selectedCheckoutAddress.city : "",
      country: selectedCheckoutAddress ? selectedCheckoutAddress.country : "",
    },
  });

  useEffect(() => {
    if (selectedCheckoutAddress) {
      form.setValue(
        "addressId",
        selectedCheckoutAddress.addressId ?? undefined,
        {
          shouldValidate: true, // Trigger validation after setting
          shouldDirty: true, // Mark field as dirty
        }
      );
      form.setValue("street", selectedCheckoutAddress.street ?? "", {
        shouldValidate: true, // Trigger validation after setting
        shouldDirty: true, // Mark field as dirty
      });
      form.setValue("building", selectedCheckoutAddress.building ?? "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      form.setValue("city", selectedCheckoutAddress.city ?? "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      form.setValue("country", selectedCheckoutAddress.country ?? "", {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [selectedCheckoutAddress, form]);

  const onSubmit = async (data: AddressType) => {
    if (selectedCheckoutAddress) {
      await dispatch(updateAddressAction(data));
    } else {
      await dispatch(createAddressAction(data));
    }
    setIsOpen(false);
    dispatch(getAddressAction());
  };

  return (
    <section>
      <div>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button>New Address</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                {selectedCheckoutAddress ? "Update Address" : "Add Address"}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Fill out the form below to create a Address.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div>
              <FormProvider {...form}>
                <AddressAddForm />
              </FormProvider>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
}

export default AddressInfoModal;
