import express from 'express';
import listings from './listings';
import places from './places';

const router = express.Router();
router.use('/listing', listings);
router.use('/places', places);

export default router;
