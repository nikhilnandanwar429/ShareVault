import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URI, 
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const uploadsDir = join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT);
    })
    .catch((err) => {
        throw err;
    });

const contentSchema = new mongoose.Schema({
    type: String,
    content: String,
    filename: String,
    code: String,
    createdAt: { type: Date, default: Date.now, expires: 86400 } 
});

const Content = mongoose.model('Content', contentSchema);

const generateUniqueCode = async () => {
    while (true) {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        const existing = await Content.findOne({ code });
        if (!existing) return code;
    }
};

// Routes
app.post('/api/upload/text', async (req, res) => {
    try {
        const { content } = req.body;
        const code = await generateUniqueCode();
        
        const newContent = new Content({
            type: 'text',
            content,
            code
        });
        
        await newContent.save();
        res.json({ code });
    } catch (error) {
        res.status(500).json({ error: 'Error uploading text' });
    }
});

app.post('/api/upload/file', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const code = await generateUniqueCode();
        
        const newContent = new Content({
            type: 'file',
            content: req.file.path,
            filename: req.file.originalname,
            code
        });
        
        await newContent.save();
        res.json({ code });
    } catch (error) {
        res.status(500).json({ error: 'Error uploading file' });
    }
});

app.get('/api/content/:code', async (req, res) => {
    try {
        const { code } = req.params;
        const content = await Content.findOne({ code });
        
        if (!content) {
            return res.status(404).json({ error: 'Content not found' });
        }
        
        res.json(content);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving content' });
    }
});

// Delete all data route
app.delete('/api/delete-all', async (req, res) => {
    try {
        const uploadsDir = join(__dirname, 'uploads');
        if (fs.existsSync(uploadsDir)) {
            const files = fs.readdirSync(uploadsDir);
            for (const file of files) {
                const filePath = join(uploadsDir, file);
                try {
                    fs.unlinkSync(filePath);
                } catch (err) {
                    console.error(`Error deleting file ${filePath}:`, err);
                }
            }
        }

        // Delete all records from MongoDB
        await Content.deleteMany({});

        res.json({ 
            message: 'Successfully deleted all content',
            filesDeleted: true,
            databaseCleared: true
        });
    } catch (error) {
        console.error('Error in delete-all route:', error);
        res.status(500).json({ 
            error: 'Failed to delete all content',
            message: error.message 
        });
    }
});
