"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const imageProcessor_1 = require("../utils/imageProcessor");
async function getValidFilenames() {
    const imageDir = path_1.default.resolve(__dirname, '../../images');
    const files = await promises_1.default.readdir(imageDir);
    return files.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg'));
}
const imageRouter = express_1.default.Router();
// GET /api/images?filename=<filename>&width=<width>&height=<height>
imageRouter.get('/', async (req, res) => {
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
        const processedImagePath = await (0, imageProcessor_1.processImage)(filename, w, h);
        res.status(200).sendFile(processedImagePath);
    }
    catch (error) {
        console.error('Error processing image:', error);
        if (error instanceof Error) {
            if (error.message === 'Original image not found') {
                res.status(404).json({ error: 'Image not found' });
            }
            else if (error.message === 'Only JPG images are supported') {
                res.status(400).json({ error: 'Only JPG images are supported' });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
        else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});
exports.default = imageRouter;
//# sourceMappingURL=image.js.map