import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { studentRoutes } from '../modules/student/student.routes';
import { facultyRoutes } from '../modules/faculty/faculty.routes';
import { BuildingRoutes } from '../modules/building/building.routes';
import { RoomRoutes } from '../modules/room/room.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semesters',
    routes: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    routes: academicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    routes: academicDepartmentRoutes,
  },
  {
    path: '/students',
    routes: studentRoutes,
  },
  {
    path: '/faculties',
    routes: facultyRoutes,
  },
  {
    path: '/buildings',
    routes: BuildingRoutes,
  },
  {
    path: '/rooms',
    routes: RoomRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
