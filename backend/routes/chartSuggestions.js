import express from 'express';
import { suggestChartType } from '../controllers/chartSuggestionsController.js';

const router = express.Router();

router.post('/', suggestChartType);

export default router;
