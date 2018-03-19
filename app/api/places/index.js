import express from 'express';
import placesAutocompleteHandler from './placesAutocompleteHandler';

const router = express.Router();
router.post('/', placesAutocompleteHandler);

export default router;
