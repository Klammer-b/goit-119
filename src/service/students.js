import { Student } from '../db/models/students.js';

export const getStudents = async () => {
  const students = await Student.find();

  return students;
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
