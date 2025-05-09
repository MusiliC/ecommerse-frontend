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
import { createAddressAction } from "@/redux/actions/AddressAction";
import { useState } from "react";

function AddressInfoModal() {
  const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);

  const form = useForm<AddressType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: "",
      building: "",
      city: "",
      country: "",
    },
  });

  const onSubmit = async (data: AddressType) => {
      await dispatch(createAddressAction(data));
      setIsOpen(false);
  };

  return (
    <section>
      <div>
        <AlertDialog open = {isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button>Add Address</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                New Address
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
