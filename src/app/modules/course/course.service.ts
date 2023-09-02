import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ICourseCreateData } from './course.interface';
import { Course } from '@prisma/client';

const insertIntoDB = async (data: ICourseCreateData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({
      data: courseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, ' Unable to create course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let index = 0; index < preRequisiteCourses.length; index++) {
        const createPreRequisite =
          await transactionClient.courseToPrerequisite.create({
            data: {
              courseId: result.id,
              preRequisiteId: preRequisiteCourses[index].courseId,
            },
          });

        console.log(createPreRequisite);
      }
    }
    return result;
  });

  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        preRequisite: {
          include: {
            preRequisite: true,
          },
        },
        PrerequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, ' Unable to create course');
};

const getAllFromDB = async () => {
  const result = await prisma.course.findMany({
    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      PrerequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });

  return result;
};

// const getAllFromDB = async (
//   filters: IStudentFilterRequest,
//   options: IPaginationOptions
// ): Promise<IGenericResponse<Student[]>> => {
//   const { limit, page, skip } = paginationHelpers.calculatePagination(options);
//   const { searchTerm, ...filterData } = filters;

//   const andConditions = [];

//   if (searchTerm) {
//     andConditions.push({
//       OR: studentSearchableFields.map(field => ({
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
//         if (studentRelationalFields.includes(key)) {
//           return {
//             [studentRelationalFieldsMapper[key]]: {
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

//   const whereConditions: Prisma.StudentWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};

//   const result = await prisma.student.findMany({
//     include: {
//       academicFaculty: true,
//       academicDepartment: true,
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
//   const total = await prisma.student.count({
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

const getByIdFromDB = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      PrerequisiteFor: {
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
  payload: ICourseCreateData
): Promise<Course | null> => {
  const { preRequisiteCourses, ...courseData } = payload;
  console.log(payload, 'kkkkkk');

  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.update({
      where: {
        id,
      },
      data: courseData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'unable to update course');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisite = preRequisiteCourses.filter(
        preRequisite => preRequisite.courseId && preRequisite.isDeleted
      );
      // why does not work console.log
      // console.log("helllp",deletedPreRequisite,"hfdfdhfdfhdfhdh")

      const newPreRequisite = preRequisiteCourses.filter(
        coursePreRequisite =>
          coursePreRequisite.courseId && !coursePreRequisite.isDeleted
      );

      for (let index = 0; index < deletedPreRequisite.length; index++) {
        await transactionClient.courseToPrerequisite.deleteMany({
          where: {
            AND: [
              { courseId: id },
              {
                preRequisiteId: deletedPreRequisite[index].courseId,
              },
            ],
          },
        });
      }

      for (let index = 0; index < newPreRequisite.length; index++) {
        await transactionClient.courseToPrerequisite.create({
          data: {
            courseId: id,
            preRequisiteId: deletedPreRequisite[index].courseId,
          },
        });
      }
    }

    return result;
  });

  const responseData = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      PrerequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return responseData;
};
const deleteFromDb = async (id: string): Promise<Course> => {
  await prisma.courseToPrerequisite.deleteMany({
    where: {
      OR: [
        {
          courseId: id,
        },
        {
          preRequisiteId: id,
        },
      ],
    },
  });

  const result = await prisma.course.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CourseService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateFromDb,
  deleteFromDb,
};
