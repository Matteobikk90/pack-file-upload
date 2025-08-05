import { S3_BUCKET, S3_REGION } from '$env/static/private';
import { prisma } from '$lib/server/prisma';
import { s3 } from '$lib/server/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { json, type RequestHandler } from '@sveltejs/kit';

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

	await s3.send(
		new PutObjectCommand({
			Bucket: S3_BUCKET,
			Key: newFileName,
			Body: buffer,
			ContentType: file.type
		})
	);

	const filePath = `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${newFileName}`;

	await prisma.file.create({
		data: {
			title,
			description,
			category,
			language,
			provider,
			roles,
			filePath
		}
	});

	return json({ success: true });
};
