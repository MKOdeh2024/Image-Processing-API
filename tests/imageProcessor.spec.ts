import { processImage } from '../src/utils/imageProcessor';
import fs from 'fs/promises';
import path from 'path';

describe('Image Processor', () => {
  const testFilename = 'fjord.jpg';
  const testWidth = 200;
  const testHeight = 200;
  const thumbDir = path.resolve(__dirname, '../thumbs');

  afterEach(async () => {
    // Clean up cached images after each test
    try {
      const files = await fs.readdir(thumbDir);
      for (const file of files) {
        if (file.startsWith('fjord_')) {
          await fs.unlink(path.join(thumbDir, file));
        }
      }
    } catch (error) {
      // Ignore if directory doesn't exist or files can't be deleted
    }
  });

  it('should process a valid image and return the output path', async () => {
    const result = await processImage(testFilename, testWidth, testHeight);
    expect(result).toContain('fjord_200x200.jpg');
    expect(result).toContain(thumbDir);

    // Check if file exists
    const exists = await fs.access(result).then(() => true).catch(() => false);
    expect(exists).toBe(true);
  });

  it('should return cached image if it already exists', async () => {
    // First call to create the image
    const result1 = await processImage(testFilename, testWidth, testHeight);

    // Second call should return the same path
    const result2 = await processImage(testFilename, testWidth, testHeight);
    expect(result1).toBe(result2);
  });

  it('should throw error for non-existent image', async () => {
    try {
      await processImage('nonexistent.jpg', testWidth, testHeight);
      fail('Expected error to be thrown');
    } catch (error) {
      expect((error as Error).message).toContain('Original image not found');
    }
  });

  it('should throw error for unsupported file format', async () => {
    try {
      await processImage('fjord.png', testWidth, testHeight);
      fail('Expected error to be thrown');
    } catch (error) {
      expect((error as Error).message).toContain('Only JPG images are supported');
    }
  });
});
