import { z } from "zod";

const schema = z.object({
  Address: z.string().trim().min(1, "Enter a property address"),
  PropertyType: z.enum([
    "Single Family",
    "Condo",
    "Townhouse",
    "Apartment",
    "Multi-Family",
    "Manufactured",
    "Land",
  ]),
  Radius: z.coerce.number().nonnegative().min(1, "Radius must be at least 1"), 
  Comparables: z.coerce.number().nonnegative().min(5).max(25), 
});

export default schema;
