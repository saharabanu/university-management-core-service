import { OfferedCourse } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { ICreateOfferedCourse } from './offeredCourse.interface';
import { asyncForEach } from '../../../shared/utils';

const insertIntoDB = async (
  data: ICreateOfferedCourse
): Promise<OfferedCourse[]> => {
  const { academicDepartmentId, semesterRegistrationId, courseIds } = data;
  const result: OfferedCourse[] = [];

  await asyncForEach(courseIds, async (courseId: string) => {
    const alreadyExist = await prisma.offeredCourse.findFirst({
      where: {
        academicDepartmentId,
        semesterRegistrationId,
        courseId,
      },
    });

    if (!alreadyExist) {
      const insertOfferedCourse = await prisma.offeredCourse.create({
        data: {
          academicDepartmentId,
          semesterRegistrationId,
          courseId,
        },
        include: {
          academicDepartment: true,
          semesterRegistration: true,
          course: true,
        },
      });
      return result.push(insertOfferedCourse);
    }
  });

  return result;
};

// const getAllFromDB = async (
//   filters: ISemesterRegistrationFilterRequest,
//   options: IPaginationOptions
// ): Promise<IGenericResponse<SemesterRegistration[]>> => {
//   const { limit, page, skip } = paginationHelpers.calculatePagination(options);
//   const { searchTerm, ...filterData } = filters;

//   const andConditions = [];

//   if (searchTerm) {
//     andConditions.push({
//       OR: semesterRegistrationSearchableFields.map(field => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }

//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map(key => {
//         if (semesterRegistrationRelationalFields.includes(key)) {
//           return {
//             [semesterRegistrationRelationalFieldsMapper[key]]: {
//               id: (filterData as any)[key],
//             },
//           };
//         } else {
//           return {
//             [key]: {
//               equals: (filterData as any)[key],
//             },
//           };
//         }
//       }),
//     });
//   }

//   const whereConditions: Prisma.SemesterRegistrationWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};

//   const result = await prisma.semesterRegistration.findMany({
//     include: {
//       academicSemester: true,
//     },
//     where: whereConditions,
//     skip,
//     take: limit,
//     orderBy:
//       options.sortBy && options.sortOrder
//         ? { [options.sortBy]: options.sortOrder }
//         : {
//             createdAt: 'desc',
//           },
//   });
//   const total = await prisma.semesterRegistration.count({
//     where: whereConditions,
//   });

//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   };
// };

// const getByIdFromDB = async (
//   id: string
// ): Promise<SemesterRegistration | null> => {
//   const result = await prisma.semesterRegistration.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       academicSemester: true,
//     },
//   });
//   return result;
// };

// const updateFromDb = async (
//   id: string,
//   payload: Partial<SemesterRegistration>
// ): Promise<SemesterRegistration> => {
//   const isExisting = await prisma.semesterRegistration.findUnique({
//     where: {
//       id,
//     },
//   });

//   if (!isExisting) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Data Not Found');
//   }

//   if (
//     payload.status &&
//     isExisting?.status === SemesterRegistrationStatus.UPCOMING &&
//     payload.status !== SemesterRegistrationStatus.ONGOING
//   ) {
//     throw new ApiError(
//       httpStatus.BAD_REQUEST,
//       'Can Only move from UPCOMING to ONGOING'
//     );
//   }
//   if (
//     payload.status &&
//     isExisting?.status === SemesterRegistrationStatus.ONGOING &&
//     payload.status !== SemesterRegistrationStatus.ENDED
//   ) {
//     throw new ApiError(
//       httpStatus.BAD_REQUEST,
//       'Can Only move from  ONGOING to ENDED'
//     );
//   }

//   const result = await prisma.semesterRegistration.update({
//     where: {
//       id,
//     },
//     data: payload,
//     include: {
//       academicSemester: true,
//     },
//   });
//   return result;
// };
// const deleteFromDb = async (id: string): Promise<SemesterRegistration> => {
//   const result = await prisma.semesterRegistration.delete({
//     where: {
//       id,
//     },
//     include: {
//       academicSemester: true,
//     },
//   });
//   return result;
// };

export const OfferedCourseService = {
  insertIntoDB,
  // getAllFromDB,
  // getByIdFromDB,
  // updateFromDb,
  // deleteFromDb,
};
