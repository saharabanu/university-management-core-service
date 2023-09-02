import express from 'express';
import { CourseController } from './coursecontroller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validations';

const router = express.Router();

router.get('/', CourseController.getAllFromDB);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CourseController.getByIdFromDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CourseValidation.update),
  CourseController.updateFromDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CourseController.deleteFromDB
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CourseValidation.create),
  CourseController.insertIntoDB
);
router.post('/:id/assign-faculties', CourseController.assignFaculties);
router.delete('/:id/remove-faculties', CourseController.removeFaculties);

export const CourseRoutes = router;
