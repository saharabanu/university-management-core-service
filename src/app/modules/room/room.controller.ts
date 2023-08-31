import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RoomService } from './room.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room created successfully',
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

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room fetched successfully',
    data: result,
  });
});
const updateFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await RoomService.updateFromDb(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room updated successfully',
    data: result,
  });
});
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await RoomService.deleteFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room deleted successfully',
    data: result,
  });
});

export const RoomController = {
  insertIntoDB,
  // getAllFromDB,
  getByIdFromDB,
  updateFromDB,
  deleteFromDB,
};
