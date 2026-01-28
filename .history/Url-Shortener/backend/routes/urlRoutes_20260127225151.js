import express from 'express';
import { shortenUrl, redirectUrl } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', shortenUrl); // Link submit krne k liye
router.get('/:shortId', redirectUrl); // Redirect krne k liye

export default router;