import express from 'express';
import { AuthRoutes } from '../modules/user/user.route';
import { BookRoutes } from '../modules/book/book.route';

const router = express.Router();

const moduleRoutes = [
  //   {
  //     path: '/academic-semesters',
  //     route: AcademicSemesterRoutes,
  //   },
  //   {
  //     path: '/academic-faculties',
  //     route: AcademicFacultyRoutes,
  //   },
  //   {
  //     path: '/academic-departments',
  //     route: AcademicDepartmentRoutes,
  //   },
  //   {
  //     path: '/students',
  //     route: StudentRoutes,
  //   },
  {
    path: '/book',
    route: BookRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
