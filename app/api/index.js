import express from 'express';
import listings from './listings';

const router = express.Router();
router.use('/listing', listings);

export default router;
