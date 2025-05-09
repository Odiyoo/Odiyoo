import { z } from "zod";

const freeRoofInspectionSchema = z.object({
    fullname: z.string().min(2, { message: "Ongeldige naam" }),
    address: z.string().min(4, { message: "Ongeldig adres" }),
    email: z.string().email({ message: "Ongeldig e-mailadres" }),
    telephone: z.string().regex(/^\+?[0-9\s\-]{7,15}$/, {
        message: 'Ongeldig telefoonnummer',
    }),
});
type FreeRoofInspectionSchema = z.infer<typeof freeRoofInspectionSchema>;

export { freeRoofInspectionSchema };
export type { FreeRoofInspectionSchema };