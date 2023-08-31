import { Building } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};

const getAllFromDB = async () =>
  // filters: IStudentFilterRequest,
  // options: IPaginationOptions
  {
    // const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    // const { searchTerm, ...filterData } = filters;

    // const andConditions = [];

    // if (searchTerm) {
    //   andConditions.push({
    //     OR: studentSearchableFields.map(field => ({
    //       [field]: {
    //         contains: searchTerm,
    //         mode: 'insensitive',
    //       },
    //     })),
    //   });
    // }

    // if (Object.keys(filterData).length > 0) {
    //   andConditions.push({
    //     AND: Object.keys(filterData).map(key => {
    //       if (studentRelationalFields.includes(key)) {
    //         return {
    //           [studentRelationalFieldsMapper[key]]: {
    //             id: (filterData as any)[key],
    //           },
    //         };
    //       } else {
    //         return {
    //           [key]: {
    //             equals: (filterData as any)[key],
    //           },
    //         };
    //       }
    //     }),
    //   });
    // }

    // const whereConditions: Prisma.StudentWhereInput =
    //   andConditions.length > 0 ? { AND: andConditions } : {};

    // const result = await prisma.student.findMany({
    //   include: {
    //     academicFaculty: true,
    //     academicDepartment: true,
    //     academicSemester: true,
    //   },
    //   where: whereConditions,
    //   skip,
    //   take: limit,
    //   orderBy:
    //     options.sortBy && options.sortOrder
    //       ? { [options.sortBy]: options.sortOrder }
    //       : {
    //           createdAt: 'desc',
    //         },
    // });
    // const total = await prisma.student.count({
    //   where: whereConditions,
    // });

    const result = await prisma.building.findMany();

    return result;

    // {
    //   // meta: {
    //   //   total,
    //   //   page,
    //   //   limit,
    //   // },
    //   data: result,
    // };
  };

// const getByIdFromDB = async (id: string): Promise<Student | null> => {
//   const result = await prisma.student.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       academicFaculty: true,
//       academicDepartment: true,
//       academicSemester: true,
//     },
//   });
//   return result;
// };

// const updateFromDb = async (
//   id: string,
//   payload: Partial<Student>
// ): Promise<Student> => {
//   const result = await prisma.student.update({
//     where: {
//       id,
//     },
//     data: payload,
//     include: {
//       academicFaculty: true,
//       academicDepartment: true,
//       academicSemester: true,
//     },
//   });
//   return result;
// };
// const deleteFromDb = async (id: string): Promise<Student> => {
//   const result = await prisma.student.delete({
//     where: {
//       id,
//     },
//     include: {
//       academicFaculty: true,
//       academicDepartment: true,
//       academicSemester: true,
//     },
//   });
//   return result;
// };

export const BuildingService = {
  insertIntoDB,
  getAllFromDB,
};
