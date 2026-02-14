import { Router } from 'express';
import { saveScore, getStudentScores } from '../controllers/score.controller.js';

const router = Router();

router.post('/', saveScore);
router.get('/:studentId', getStudentScores);

export default router;
