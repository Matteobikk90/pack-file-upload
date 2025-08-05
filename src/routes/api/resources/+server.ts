import { prisma } from '$lib/server/prisma';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const files = await prisma.file.findMany({
		orderBy: { createdAt: 'desc' }
	});
	return json({ resources: files });
};
