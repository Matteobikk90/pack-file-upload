import { prisma } from '$lib/server/prisma';
import { json } from '@sveltejs/kit';

export async function GET() {
	try {
		const [categories, languages, providers, roles] = await Promise.all([
			prisma.category.findMany(),
			prisma.language.findMany(),
			prisma.provider.findMany(),
			prisma.role.findMany()
		]);

		return json({ categories, languages, providers, roles });
	} catch (e) {
		console.error('API /api/options error:', e);
		return new Response(JSON.stringify({ message: 'Internal Error' }), {
			status: 500
		});
	}
}
