import { AcademicSemester } from '@prisma/client';
import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { academicSemesterFilterableFields } from './academicSemester.constant';
// post
const insertIntoDb: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.insertIntoDb(req.body);

  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});

// get all
const getAllFromDb: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicSemesterFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await AcademicSemesterService.getAllFromDb(filters, options);

  sendResponse<AcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic Semesters Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});
// get all
const getSingleFromDb: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleFromDb(id);

  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic Semesters Retrieved Successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  insertIntoDb,
  getAllFromDb,
  getSingleFromDb,
};
