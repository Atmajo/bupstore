import { Router, Request, Response } from 'express';
import { BackupRouter } from './backup';
import { AuthRouter } from './auth';
import { SettingsRouter } from './settings';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API' });
});

router.use('/auth', AuthRouter);
router.use('/settings', SettingsRouter);
router.use('/backup', BackupRouter);

export default router;
