"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_js_1 = __importDefault(require("./routes/image.js"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware to parse JSON if needed in future
app.use(express_1.default.json());
// Register image processing routes
app.use('/api/images', image_js_1.default);
// Basic root endpoint
app.get('/', (req, res) => {
    res.status(200).send('Image Processing API is running');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map