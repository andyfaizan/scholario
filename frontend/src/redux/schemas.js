import { Schema, arrayOf } from 'normalizr'


export const userSchema = new Schema('users', {
  idAttribute: '_id',
})

export const universitySchema = new Schema('universities', {
  idAttribute: '_id',
})

export const programSchema = new Schema('programs', {
  idAttribute: '_id',
})

export const courseSchema = new Schema('courses', {
  idAttribute: '_id',
})

export const courseInstanceSchema = new Schema('courseInstances', {
  idAttribute: '_id',
})

export const questionSchema = new Schema('questions', {
  idAttribute: '_id',
})

export const answerSchema = new Schema('answers', {
  idAttribute: '_id',
})

export const commentSchema = new Schema('comments', {
  idAttribute: '_id',
})

export const pkgSchema = new Schema('pkgs', {
  idAttribute: '_id',
})

export const materialSchema = new Schema('materials', {
  idAttribute: '_id',
})

export const bookmarkSchema = new Schema('bookmarks', {
  idAttribute: '_id',
})

export const eventSchema = new Schema('events', {
  idAttribute: '_id',
})

userSchema.define({
  courseInstances: arrayOf(courseInstanceSchema),
  universities: arrayOf(universitySchema),
  programs: arrayOf(programSchema),
  followings: arrayOf(userSchema),
  questions: arrayOf(questionSchema),
  activities: arrayOf(eventSchema),
  notifications: arrayOf(eventSchema),
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

commentSchema.define({
  user: userSchema,
})

pkgSchema.define({
  courseInstance: courseInstanceSchema,
  owner: userSchema,
  materials: arrayOf(materialSchema),
  bookmarks: arrayOf(bookmarkSchema),
})

materialSchema.define({
  pkg: pkgSchema,
})

bookmarkSchema.define({
  pkg: pkgSchema,
})

eventSchema.define({
  to: arrayOf(userSchema),
  by: userSchema,
  question: questionSchema,
  answer: answerSchema,
})
