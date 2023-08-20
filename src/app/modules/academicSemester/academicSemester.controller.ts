import { AcademicSemester } from '@prisma/client';
import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

const insertIntoDb: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.insertIntoDb(req.body);

  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  insertIntoDb,
};
