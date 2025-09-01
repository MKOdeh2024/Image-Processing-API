import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

const fullImageDir = path.resolve(__dirname, '../../images');
const thumbDir = path.resolve(__dirname, '../../thumbs');

export async function processImage(
  filename: string,
  width: number,
  height: number,
): Promise<string> {
  // Validate file extension and name
  const ext = path.extname(filename).toLowerCase();
  if (ext !== '.jpg' && ext !== '.jpeg') {
    throw new Error('Only JPG images are supported');
  }

  const nameWithoutExt = path.basename(filename, ext);
  const inputPath = path.join(fullImageDir, filename);
  const outputFilename = `${nameWithoutExt}_${width}x${height}${ext}`;
  const outputPath = path.join(thumbDir, outputFilename);

  // Check if cached image exists
  try {
    await fs.access(outputPath);
    // Cached image exists
    return outputPath;
  } catch {
    // Cached image does not exist, proceed to create
  }

  // Check if original image exists
  try {
    await fs.access(inputPath);
  } catch {
    throw new Error('Original image not found');
  }

  // Resize image using sharp
  await sharp(inputPath).resize(width, height).toFile(outputPath);

  return outputPath;
}
