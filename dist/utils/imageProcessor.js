"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = processImage;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const sharp_1 = __importDefault(require("sharp"));
const fullImageDir = path_1.default.resolve(__dirname, '../../images');
const thumbDir = path_1.default.resolve(__dirname, '../../thumbs');
async function processImage(filename, width, height) {
    // Validate file extension and name
    const ext = path_1.default.extname(filename).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg') {
        throw new Error('Only JPG images are supported');
    }
    const nameWithoutExt = path_1.default.basename(filename, ext);
    const inputPath = path_1.default.join(fullImageDir, filename);
    const outputFilename = `${nameWithoutExt}_${width}x${height}${ext}`;
    const outputPath = path_1.default.join(thumbDir, outputFilename);
    // Check if cached image exists
    try {
        await promises_1.default.access(outputPath);
        // Cached image exists
        return outputPath;
    }
    catch {
        // Cached image does not exist, proceed to create
    }
    // Check if original image exists
    try {
        await promises_1.default.access(inputPath);
    }
    catch {
        throw new Error('Original image not found');
    }
    // Resize image using sharp
    await (0, sharp_1.default)(inputPath).resize(width, height).toFile(outputPath);
    return outputPath;
}
//# sourceMappingURL=imageProcessor.js.map