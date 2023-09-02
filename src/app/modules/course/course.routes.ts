import express from 'express';
import { CourseController } from './coursecontroller';

const router = express.Router();

router.get('/', CourseController.getAllFromDB);
// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   validateRequest(StudentValidation.update),
//   StudentController.updateFromDB
// );
// router.get(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   StudentController.getByIdFromDB
// );
// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   StudentController.deleteFromDB
// );

router.post('/', CourseController.insertIntoDB);

export const CourseRoutes = router;
