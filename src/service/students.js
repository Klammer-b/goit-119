import createHttpError from 'http-errors';
import { Student } from '../db/models/students.js';

const createPaginationData = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    page,
    perPage,
    hasNextPage,
    hasPreviousPage,
    totalItems: count,
    totalPages,
  };
};

export const getStudents = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'desc',
  filter = {},
  search = '',
}) => {
  const skip = (page - 1) * perPage;
  const studentsFilterQuery = Student.find();
  if (filter.minAge) {
    studentsFilterQuery.where('age').gte(filter.minAge);
  }

  if (filter.maxAge) {
    studentsFilterQuery.where('age').lte(filter.maxAge);
  }

  if (filter.minAvgMark) {
    studentsFilterQuery.where('avgMark').gte(filter.minAvgMark);
  }

  if (filter.maxAvgMark) {
    studentsFilterQuery.where('avgMark').lte(filter.maxAvgMark);
  }

  if (filter.gender) {
    studentsFilterQuery.where('gender').equals(filter.gender);
  }

  if (filter.onDuty !== undefined) {
    studentsFilterQuery.where('onDuty').equals(filter.onDuty);
  }

  if (search) {
    studentsFilterQuery.where({ $text: { $search: search } });
  }

  const [students, studentsCount] = await Promise.all([
    studentsFilterQuery
      .clone()
      .skip(skip)
      .limit(perPage)
      .sort({
        [sortBy]: sortOrder,
      }),
    studentsFilterQuery.clone().countDocuments(),
  ]);
  const paginationData = createPaginationData(page, perPage, studentsCount);

  if (page > paginationData.totalPages && paginationData.totalPages !== 0) {
    throw createHttpError(
      400,
      `The maximum page is ${paginationData.totalPages}`,
    );
  }

  return { students, metadata: paginationData };
};

export const getStudentById = async (studentId) => {
  const student = await Student.findById(studentId);

  return student;
};

export const createStudent = async (payload) => {
  const student = await Student.create(payload);

  return student;
};

export const updateStudentById = async (studentId, payload) => {
  const student = await Student.findByIdAndUpdate(studentId, payload, {
    returnOriginal: false,
  });

  return student;
};

export const deleteStudentById = async (studentId) => {
  await Student.findByIdAndDelete(studentId);
};
