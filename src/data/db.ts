import { Prisma, PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

Object.freeze(prismaClient);

export default prismaClient;

export function isPrismaError(
	error: Error | Prisma.PrismaClientKnownRequestError
): error is Prisma.PrismaClientKnownRequestError {
	return (<Prisma.PrismaClientKnownRequestError>error).code !== undefined;
}
