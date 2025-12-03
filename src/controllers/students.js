import createHttpError from 'http-errors';
import {
  createStudent,
  deleteStudentById,
  getStudentById,
  getStudents,
  updateStudentById,
} from '../service/students.js';

export const getStudentsController = async (req, res) => {
  const students = await getStudents();

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};

export const getStudentByIdController = async (req, res) => {
  const { studentId } = req.params;

  const student = await getStudentById(studentId);

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
  const student = await createStudent(req.body);

  return res.status(201).json({
    status: 201,
    message: 'Student was successfully created!',
    data: student,
  });
};

export const updateStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  const student = await updateStudentById(studentId, req.body);

  if (!student) {
    throw createHttpError(404, `Student with id ${studentId} not found!`);
  }

  return res.json({
    status: 200,
    message: `Student with id ${studentId} successfully created!`,
    data: student,
  });
};

export const deleteStudentByIdController = async (req, res) => {
  const { studentId } = req.params;

  await deleteStudentById(studentId);

  res.status(204).send();
};
