import express from 'express';
import createListingHandler from './createListingHandler';

const router = express.Router();
router.post('/', createListingHandler);

export default router;
