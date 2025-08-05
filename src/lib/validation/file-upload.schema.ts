import { z } from 'zod';

export const FormSchema = z.object({
	title: z.string().max(200),
	description: z.string().max(1000),
	category: z.string().min(1).nullable(),
	language: z.string().min(1).nullable(),
	provider: z.string().min(1).nullable(),
	roles: z.array(z.string()).min(1),
	file: z
		.instanceof(File, { message: 'A file is required' })
		.refine((file) => file && file.size > 0, { message: 'A file is required' })
});

export type FormValues = z.infer<typeof FormSchema>;
