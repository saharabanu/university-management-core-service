import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(AcademicSemesterValidation.createAcademicSemester),
  AcademicSemesterController.insertIntoDb
);
router.get('/:id', AcademicSemesterController.getSingleFromDb);
router.get('/', AcademicSemesterController.getAllFromDb);

export const AcademicSemesterRoutes = router;
