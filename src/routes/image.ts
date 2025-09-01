import express, { Router, Request, Response } from 'express';
import { processImage } from '../utils/imageProcessor.js';

const router: Router = express.Router();

// GET /api/images?filename=<filename>&width=<width>&height=<height>
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename, width, height } = req.query;

    if (!filename || !width || !height) {
      res
        .status(400)
        .json({
          error: 'Missing required parameters: filename, width, height',
        });
      return;
    }

    const w = parseInt(width as string, 10);
    const h = parseInt(height as string, 10);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      res
        .status(400)
        .json({ error: 'Width and height must be positive numbers' });
      return;
    }

    const processedImagePath = await processImage(filename as string, w, h);

    res.status(200).sendFile(processedImagePath);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
