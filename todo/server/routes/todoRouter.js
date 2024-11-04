// import { pool } from '../helpers/db.js';
import { Router } from 'express';
// import { emptyOrRows } from '../helpers/utils.js';
import { auth } from '../helper/auth.js'
import { deleteTask, getTasks, postTask } from '../controllers/TaskController.js';

const router = Router();

router.get('/', getTasks);

router.post('/create', auth, postTask);

router.delete('/delete/:id', deleteTask);

export default router;