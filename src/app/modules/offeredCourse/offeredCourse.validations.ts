import { z } from 'zod';

const create = z.object({
  body: z.object({
    academicDepartmentId: z.string({
      required_error: 'academicDepartmentId id is required',
    }),
    semesterRegistrationId: z.string({
      required_error: 'semesterRegistrationId id is required',
    }),
    courseIds: z.array(
      z.string({
        required_error: ' courseId is required',
      }),
      {
        required_error: ' course Ids are required',
      }
    ),
  }),
});

const update = z.object({
  body: z.object({}),
});

export const OfferedCourseValidation = {
  create,
  update,
};
