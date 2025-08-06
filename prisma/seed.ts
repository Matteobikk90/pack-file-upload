import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
const prisma = new PrismaClient();

const seed = async () => {
	// Optional: clear tables first (for dev only)
	await prisma.category.deleteMany();
	await prisma.language.deleteMany();
	await prisma.provider.deleteMany();
	await prisma.role.deleteMany();

	await prisma.category.createMany({
		data: ['Leadership', 'Managing', 'Complexity'].map((name) => ({ name }))
	});
	await prisma.language.createMany({
		data: ['English', 'Italian', 'Spanish'].map((name) => ({ name }))
	});
	await prisma.provider.createMany({
		data: ['Skilla', 'Linkedin', 'Pack', 'Mentor'].map((name) => ({ name }))
	});
	await prisma.role.createMany({
		data: ['Mentor/Coach', 'Mentee/Coachee'].map((name) => ({
			name
		}))
	});
};

seed()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
