import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validations';

const router = express.Router();

router.get('/', StudentController.getAllFromDB);
router.patch(
  '/:id',
  validateRequest(StudentValidation.update),
  StudentController.updateFromDB
);
router.get('/:id', StudentController.getByIdFromDB);
router.delete('/:id', StudentController.deleteFromDB);

router.post(
  '/',
  validateRequest(StudentValidation.create),
  StudentController.insertIntoDB
);

export const studentRoutes = router;
