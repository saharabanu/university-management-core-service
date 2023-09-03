import express from 'express';
import { OfferedCourseController } from './offeredCourse.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidation } from './offeredCourse.validations';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(OfferedCourseValidation.create),
  OfferedCourseController.insertIntoDB
);

router.get('/');

export const OfferedCourseRoutes = router;
