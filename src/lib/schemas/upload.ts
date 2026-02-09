import { z } from "zod";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export const uploadSchema = z.object({
  file: z
    .custom<File>(
      (val) => val instanceof File,
      "O upload de um arquivo é obrigatório",
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "O arquivo deve ter no máximo 20MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Formato inválido. Use JPG, PNG ou JPEG",
    }),
  category: z.string().min(1, "Selecione uma categoria válida"),
  tags: z.array(z.string()).min(3, "Adicione pelo menos 2 tags"),
});

export type UploadData = z.infer<typeof uploadSchema>;
