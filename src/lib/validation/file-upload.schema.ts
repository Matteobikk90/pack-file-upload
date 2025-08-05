import { z } from 'zod';

export const FormSchema = z.object({
	title: z.string().max(200),
	description: z.string().max(1000),
	category: z.string().min(1),
	language: z.string().min(1),
	provider: z.string().min(1),
	roles: z.array(z.string()).min(1),
	file: z.any()
});

export type FormValues = z.infer<typeof FormSchema>;
