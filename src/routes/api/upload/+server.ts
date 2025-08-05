import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();
	console.log({ data });

	const title = data.get('title') as string;
	const description = data.get('description') as string;
	const category = data.get('category') as string;
	const language = data.get('language') as string;
	const provider = data.get('provider') as string;
	const roles = data.getAll('roles') as string[];
	const file = data.get('file') as File;

	if (!title || !description || !category || !language || !provider || !roles.length || !file) {
		return new Response('Missing required fields', { status: 400 });
	}

	await prisma.file.create({
		data: {
			title,
			description,
			category,
			language,
			provider,
			roles,
			filePath: file.name
		}
	});

	return json({ success: true });
};
