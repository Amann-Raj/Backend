import express from 'express';
import { shortenUrl, redirectUrl, getStats } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', shortenUrl); // Link submit krne k liye
router.get('/:shortId', redirectUrl); // Redirect krne k liye
router.get('/stats/:shortId', getStats);

export default router;