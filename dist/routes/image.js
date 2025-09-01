"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageProcessor_js_1 = require("../utils/imageProcessor.js");
const router = express_1.default.Router();
// GET /api/images?filename=<filename>&width=<width>&height=<height>
router.get('/', async (req, res) => {
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
        const w = parseInt(width, 10);
        const h = parseInt(height, 10);
        if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
            res
                .status(400)
                .json({ error: 'Width and height must be positive numbers' });
            return;
        }
        const processedImagePath = await (0, imageProcessor_js_1.processImage)(filename, w, h);
        res.status(200).sendFile(processedImagePath);
    }
    catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=image.js.map