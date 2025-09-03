import express, { Router, Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { processImage } from '../utils/imageProcessor';

async function getValidFilenames(): Promise<string[]> {
  const imageDir = path.resolve(__dirname, '../../images');
  const files = await fs.readdir(imageDir);
  return files.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg'));
}

const imageRouter: Router = express.Router();

// GET /api/images?filename=<filename>&width=<width>&height=<height>
imageRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename, width, height } = req.query;

    if (filename === '') {
      res.status(400).json({ error: 'Filename must be a non-empty string' });
      return;
    }

    if (!filename || !width || !height) {
      res
        .status(400)
        .json({
          error: 'Missing required parameters: filename, width, height',
        });
      return;
    }

    if (typeof filename !== 'string' || !filename.trim()) {
      res.status(400).json({ error: 'Filename must be a non-empty string' });
      return;
    }

    const validFilenames = await getValidFilenames();
    if (!validFilenames.includes(filename)) {
      res.status(400).json({ error: `Invalid filename. Allowed filenames: ${validFilenames.join(', ')}` });
      return;
    }

    if (typeof width !== 'string' || !/^\d+$/.test(width)) {
      res.status(400).json({ error: 'Width must be a positive integer' });
      return;
    }

    const w = parseInt(width, 10);
    if (w <= 0 || w > 10000) {
      res.status(400).json({ error: 'Width must be between 1 and 10000' });
      return;
    }

    if (typeof height !== 'string' || !/^\d+$/.test(height)) {
      res.status(400).json({ error: 'Height must be a positive integer' });
      return;
    }

    const h = parseInt(height, 10);
    if (h <= 0 || h > 10000) {
      res.status(400).json({ error: 'Height must be between 1 and 10000' });
      return;
    }

    const processedImagePath = await processImage(filename as string, w, h);

    res.status(200).sendFile(processedImagePath);
  } catch (error) {
    console.error('Error processing image:', error);
    if (error instanceof Error) {
      if (error.message === 'Original image not found') {
        res.status(404).json({ error: 'Image not found' });
      } else if (error.message === 'Only JPG images are supported') {
        res.status(400).json({ error: 'Only JPG images are supported' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default imageRouter;
