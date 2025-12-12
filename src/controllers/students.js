import createHttpError from 'http-errors';
import {
  createStudent,
  deleteStudentById,
  getStudentById,
  getStudents,
  updateStudentById,
} from '../service/students.js';

export const getStudentsController = async (req, res) => {
  const students = await getStudents({
    page: req.query.page,
    perPage: req.query.perPage,
    sortBy: req.query.sortBy,
    sortOrder: req.query.sortOrder,
    filter: {
      userId: req.user._id,
      minAge: req.query.minAge,
      maxAge: req.query.maxAge,
      minAvgMark: req.query.minAvgMark,
      maxAvgMark: req.query.maxAvgMark,
      onDuty: req.query.onDuty,
      gender: req.query.gender,
    },
    search: req.query.search,
  });

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};

export const getStudentByIdController = async (req, res) => {
  const { studentId } = req.params;

  const student = await getStudentById(studentId, req.user._id);

  if (!student) {
    throw createHttpError(404, `Student with id ${studentId} not found!`);
  }

  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};

export const createStudentController = async (req, res) => {
  const userId = req.body.userId ? req.body.userId : req.user._id;
  const student = await createStudent({ ...req.body, userId });

  return res.status(201).json({
    status: 201,
    message: 'Student was successfully created!',
    data: student,
  });
};

export const updateStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  const student = await updateStudentById(studentId, req.body, req.user._id);

  if (!student) {
    throw createHttpError(404, `Student with id ${studentId} not found!`);
  }

  return res.json({
    status: 200,
    message: `Student with id ${studentId} successfully updated!`,
    data: student,
  });
};

export const deleteStudentByIdController = async (req, res) => {
  const { studentId } = req.params;

  await deleteStudentById(studentId, req.user._id);

  res.status(204).send();
};
