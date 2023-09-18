"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
// Middleware to log the incoming requests
app.use((req, res, next) => {
    console.log(`Received ${req.method} request at ${req.url}`);
    next(); // Pass control to the next middleware
});
// Route handler
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
