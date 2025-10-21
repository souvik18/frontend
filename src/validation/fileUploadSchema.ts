import { z } from "zod";
import { MESSAGES } from "../constant";

export const recordSchema = z.object({
  file: z
    .any()
    .refine((file) => file instanceof File, {
      message: MESSAGES.fileRequired,
    })
    .refine(
      (file) =>
        ["text/csv", "text/xml", "application/xml"].includes(file?.type),
      {
        message: MESSAGES.csvXmlAllowd,
      },
    )
    .refine((file) => file?.size <= 5 * 1024 * 1024, {
      message: MESSAGES.fileSideExceed,
    }),
});

export type RecordSchema = z.infer<typeof recordSchema>;
