import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();

	const title = data.get('title') as string;
	const description = data.get('description') as string;
	const category = data.get('category') as string;
	const language = data.get('language') as string;
	const provider = data.get('provider') as string;
	const roles = data.getAll('roles') as string[];
	const file = data.get('file') as File;

	if (!title || !description || !category || !language || !provider || !roles.length || !file) {
		return json({ success: false, message: 'Missing required fields' }, { status: 400 });
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const ext = path.extname(file.name);
	const newFileName = `${uuidv4()}${ext}`;
	const filePath = `static/uploads/${newFileName}`;

	await writeFile(filePath, buffer);

	await prisma.file.create({
		data: {
			title,
			description,
			category,
			language,
			provider,
			roles,
			filePath: newFileName
		}
	});

	return json({ success: true });
};
