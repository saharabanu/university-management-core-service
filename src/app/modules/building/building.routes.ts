import express from 'express';
import { BuildingController } from './building.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingValidation } from './building.validations';

const router = express.Router();

// router.get('/', StudentController.getAllFromDB);
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

router.get('/', BuildingController.getAllFromDB);
router.post(
  '/',
  validateRequest(BuildingValidation.create),
  BuildingController.insertIntoDB
);

export const BuildingRoutes = router;
