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

function AddressInfoModal() {
  const dispatch = useAppDispatch();

  const form = useForm<AddressType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: "",
      building: "",
      city: "",
      country: "",
    },
  });

  const onSubmit = (data: AddressType) => {
    dispatch(createAddressAction(data));
  };

  return (
    <section>
      <div>
        <AlertDialog>
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
