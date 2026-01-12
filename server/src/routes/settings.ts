import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import crypto from 'crypto';

const router = Router();

router.use(authenticateToken);

router.post('/generatejwt', async (req: Request, res: Response) => {
    try {
        const userId = req.user!.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newUserJWT = crypto.createHash('sha256').update(user.email + crypto.randomUUID()).digest('hex');

        await prisma.user.update({
            where: { id: userId },
            data: { userJWT: newUserJWT }
        });

        return res.json({ message: 'New JWT generated successfully', data: { userJWT: newUserJWT } });
    } catch (error) {
        console.error('Generate JWT error:', error);
        return res.status(500).json({ error: 'Failed to generate new JWT' });
    }
});

export const SettingsRouter = router;