import { Schema, arrayOf } from 'normalizr'


export const userSchema = new Schema('users', {
  idAttribute: '_id'
})

export const universitySchema = new Schema('universities', {
  idAttribute: '_id'
})

export const programSchema = new Schema('programs', {
  idAttribute: '_id'
})

export const courseSchema = new Schema('courses', {
  idAttribute: '_id'
})

export const courseInstanceSchema = new Schema('courseInstances', {
  idAttribute: '_id'
})

export const questionSchema = new Schema('questions', {
  idAttribute: '_id'
})

export const answerSchema = new Schema('answers', {
  idAttribute: '_id'
})

export const pkgSchema = new Schema('pkgs', {
  idAttribute: '_id'
})

export const materialSchema = new Schema('materials', {
  idAttribute: '_id'
})

userSchema.define({
  courseInstances: arrayOf(courseInstanceSchema),
  universities: arrayOf(universitySchema),
  programs: arrayOf(programSchema),
  followings: arrayOf(userSchema),
  questions: arrayOf(questionSchema),
})

programSchema.define({
  university: universitySchema,
})

courseSchema.define({
  university: universitySchema,
  program: programSchema,
})

courseInstanceSchema.define({
  course: courseSchema,
  prof: userSchema,
  questions: arrayOf(questionSchema),
  pkgs: arrayOf(pkgSchema),
})

questionSchema.define({
  courseInstance: courseInstanceSchema,
  user: userSchema,
  answers: arrayOf(answerSchema),
})

answerSchema.define({
  user: userSchema,
})

pkgSchema.define({
  courseInstance: courseInstanceSchema,
  owner: userSchema,
  materials: arrayOf(materialSchema),
})

materialSchema.define({
  pkg: pkgSchema,
})
