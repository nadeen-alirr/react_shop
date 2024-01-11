import express from 'express';
const router = express.Router();
import {products} from '../data/proudcts.js';
import { getProuduct,getpruductByID } from '../controllers/prouductController.js';

router.route('/').get(getProuduct);
router.route('/:id').get(getpruductByID)


export default router;