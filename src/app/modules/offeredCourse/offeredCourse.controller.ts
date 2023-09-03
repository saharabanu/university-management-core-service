import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseService } from './offeredCourse.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse created successfully',
    data: result,
  });
});

// const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, semesterRegistrationFilterableFields);
//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
//   // console.log(options, "thid filtrt",filters)
//   const result = await SemesterRegistrationService.getAllFromDB(
//     filters,
//     options
//   );
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'ALL semesterRegistration fetched successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });

// const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await SemesterRegistrationService.getByIdFromDB(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'SINGLE Semester Registration fetched successfully',
//     data: result,
//   });
// });

// const updateFromDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const payload = req.body;
//   const result = await SemesterRegistrationService.updateFromDb(id, payload);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'SINGLE Semester Registration updated successfully',
//     data: result,
//   });
// });

// const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const result = await SemesterRegistrationService.deleteFromDb(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'SINGLE Semester Registration deleted successfully',
//     data: result,
//   });
// });

export const OfferedCourseController = {
  insertIntoDB,
  // getAllFromDB,
  // getByIdFromDB,
  // updateFromDB,
  // deleteFromDB,
};
