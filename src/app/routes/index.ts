import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { studentRoutes } from '../modules/student/student.routes';
import { facultyRoutes } from '../modules/faculty/faculty.routes';
import { BuildingRoutes } from '../modules/building/building.routes';
import { RoomRoutes } from '../modules/room/room.routes';
import { CourseRoutes } from '../modules/course/course.routes';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.routes';
import { OfferedCourseRoutes } from '../modules/offeredCourse/offeredCourse.routes';
import { OfferedCourseSectionRoutes } from '../modules/offeredCourseSection/offeredCourseSection.routes';

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
  {
    path: '/course',
    routes: CourseRoutes,
  },
  {
    path: '/semester-registration',
    routes: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-course',
    routes: OfferedCourseRoutes,
  },
  {
    path: '/offered-course-section',
    routes: OfferedCourseSectionRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
