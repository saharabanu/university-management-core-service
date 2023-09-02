import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { CourseService } from './course.service';
import sendResponse from '../../../shared/sendResponse';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

// const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, studentFilterableFields);
//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
//   const result = await StudentService.getAllFromDB(filters, options);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Students fetched successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course fetched successfully',
    data: result,
  });
});
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    data: result,
  });
});
const updateFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await CourseService.updateFromDb(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CourseService.deleteFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

export const CourseController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateFromDB,
  deleteFromDB,
};
