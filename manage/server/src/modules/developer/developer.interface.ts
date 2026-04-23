import z from "zod";
import { developerSchema } from "./developer.validator";

export type developerInput = z.infer<typeof developerSchema>;
// export type UpdateDeveloperInput = z.infer<
//   typeof updateDeveloperSchema
// >;