import { OfferedCourseSection, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IOfferedCourseSectionFilterRequest } from './offeredCourseSection.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { offeredCourseSearchableFields } from '../offeredCourse/offeredCourse.constants';
import {
  offeredCourseSectionRelationalFields,
  offeredCourseSectionRelationalFieldsMapper,
} from './offeredCourseSection.constants';

const insertIntoDB = async (data: any): Promise<OfferedCourseSection> => {
  const isOfferedCourseExist = await prisma.offeredCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });
  data.semesterRegistrationId = isOfferedCourseExist?.semesterRegistrationId;

  if (!isOfferedCourseExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Offered Course does not exist');
  }

  const result = await prisma.offeredCourseSection.create({
    data,
    include: {
      offeredCourse: true,
      semesterRegistration: true,
    },
  });

  return result;
};

const getAllFromDB = async (
  filters: IOfferedCourseSectionFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourseSection[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredCourseSectionRelationalFields.includes(key)) {
          return {
            [offeredCourseSectionRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.OfferedCourseSectionWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourseSection.findMany({
    include: {
      offeredCourse: {
        include: {
          course: true,
        },
      },
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.offeredCourseSection.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (
  id: string
): Promise<OfferedCourseSection | null> => {
  const result = await prisma.offeredCourseSection.findUnique({
    where: {
      id,
    },
    include: {
      offeredCourse: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};

const updateFromDb = async (
  id: string,
  payload: Partial<OfferedCourseSection>
): Promise<OfferedCourseSection> => {
  const result = await prisma.offeredCourseSection.update({
    where: {
      id,
    },
    data: payload,
    include: {
      offeredCourse: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};
const deleteFromDb = async (id: string): Promise<OfferedCourseSection> => {
  const result = await prisma.offeredCourseSection.delete({
    where: {
      id,
    },
    include: {
      offeredCourse: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};

export const OfferedCourseSectionService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateFromDb,
  deleteFromDb,
};
