import { z } from "zod";

export const addressSchema = z.object({
  addressId: z.number().optional(),
   street: z.string().min(1, "Street is required"),
   building: z.string().min(1, "Building is required"),
   city: z.string().min(1, "City is required"),
   country: z.string().min(1, "Country is required"),
 });

 // Infer the type from the Zod schema
 export type AddressType = z.infer<typeof addressSchema>;