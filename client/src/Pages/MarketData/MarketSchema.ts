import { z } from "zod";

const schema = z.object({
  zipCode: z.string().trim().min(5, "Enter a valid 5-digit US zip code."),
  dataType: z.enum(["All", "Sale", "Rental"]),
  historyRange: z.coerce.number().nonnegative(),
});

export default schema;
