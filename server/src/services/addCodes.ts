import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";

export const addCodes = async (name: string, userId: string, codes: string[]) => {
    try {
        const existingDomain = await prisma.domain.findUnique({
            where: { name }
        })

        if (existingDomain) {
            return { success: false };
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        const newDomain = await prisma.domain.create({
            data: {
                name,
                userId,
                codes: {
                    create: codes.map((code, index) => ({
                        code: jwt.sign({ code }, user?.userJWT!, { expiresIn: '365d' }),
                        slot: index + 1,
                        status: 'active',
                    })),
                },
                totalCodes: codes.length,
                remainingCodes: codes.length,
            }
        });

        return { success: true, newDomain };
    } catch (error) {
        console.log('Error adding codes:', error);
        throw new Error('Failed to add codes');
    }
}