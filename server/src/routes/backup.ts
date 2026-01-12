import { Router, Request, Response } from 'express';
import { BackupAddData, CodeStatus } from '../../types';
import { authenticateToken } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { addCodes } from '../services/addCodes';
import { extractCodes } from '../services/extractCodes';
import { decodeCodes } from '../services/decodeCodes';
import multer from 'multer';
import path from 'path';

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (_req, file, cb) => {
    const allowedExtensions = ['.txt', '.pdf'];
    const allowedMimeTypes = ['text/plain', 'application/pdf'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(ext) && allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .txt and .pdf files are allowed'));
    }
  },
});

// All backup routes require authentication
router.use(authenticateToken);

router.get('/', async (_req: Request, res: Response) => {
  try {
    const domains = await prisma.domain.findMany({
      where: { userId: _req.user!.userId },
      include: {
        codes: true,
      }
    });

    if (domains.length === 0) {
      return res.json({ message: 'No backup codes found', data: { domains: [] } });
    }

    const user = await prisma.user.findUnique({
      where: { id: _req.user!.userId },
      select: { userJWT: true }
    });

    // Decode the codes
    const decodedDomains = domains.map(domain => ({
      ...domain,
      codes: decodeCodes(domain.codes, user!.userJWT!)
    }));

    return res.json({ message: 'Domains retrieved successfully', data: { domains: decodedDomains } });
  } catch (error) {
    console.error('Get domains message:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:domainId', async (_req: Request, res: Response) => {
  try {
    const domainId = _req.params.domainId;

    const domain = await prisma.domain.findUnique({
      where: { userId: _req.user!.userId, id: domainId },
      include: {
        codes: {
          orderBy: { slot: 'asc' }
        },
      }
    });

    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' });
    }

    const user = await prisma.user.findUnique({
      where: { id: _req.user!.userId },
      select: { userJWT: true }
    });

    // Decode the codes
    const decodedCodes = decodeCodes(domain.codes, user!.userJWT!);

    return res.json({ message: 'Domain retrieved successfully', data: { codes: decodedCodes } });
  } catch (error) {
    console.error('Get domain message:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/add', async (req: Request, res: Response) => {
  const data: BackupAddData = req.body;

  try {
    const response = await addCodes(data.name, req.user!.userId, data.codes);

    if (!response.success) {
      return res.status(400).json({ message: 'Domain already exists' });
    }

    return res.json({ message: "Domain added successfully", data: { domain: response.newDomain } });
  } catch (error) {
    return res.status(500).json({ message: 'Database error during domain check' });
  }
});

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileExtension = path.extname(req.file.originalname).toLowerCase();

    // Validate file type
    if (!['.txt', '.pdf'].includes(fileExtension)) {
      return res.status(400).json({ message: 'Only .txt and .pdf files are allowed' });
    }

    const response = await extractCodes(req.file);

    if (!response.success) {
      return res.status(500).json({ message: response.message });
    }

    res.json({
      message: response.message,
      data: {
        codes: response.codes
      }
    });
  } catch (error) {
    console.error('Upload message:', error);
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size exceeds 5MB limit' });
      }
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'File upload failed' });
  }
});

// Update a specific backup code
router.put('/:domainId/:codeId', async (req: Request, res: Response) => {
  try {
    const { domainId, codeId } = req.params;
    const { status } = req.body;

    const updatedCode = await prisma.code.updateMany({
      where: {
        id: codeId,
        domain: {
          id: domainId,
          userId: req.user!.userId
        }
      },
      data: {
        status: status as CodeStatus,
        usedAt: status === 'used' ? new Date().toISOString() : null
      }
    });

    if (updatedCode.count === 0) {
      return res.json({ message: 'Code not found or not authorized' });
    }

    return res.json({ message: 'Code updated successfully', data: { codes: updatedCode } });
  } catch (error) {
    console.error('Update code message:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as BackupRouter };
