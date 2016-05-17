import { Schema, arrayOf } from 'normalizr'


const userSchema = new Schema('users', {
  idAttribute: '_id'
})

const universitySchema = new Schema('universities', {
  idAttribute: '_id'
})

const programSchema = new Schema('programs', {
  idAttribute: '_id'
})

const courseSchema = new Schema('courses', {
  idAttribute: '_id'
})

const courseInstanceSchema = new Schema('courseInstances', {
  idAttribute: '_id'
})

const questionSchema = new Schema('questions', {
  idAttribute: '_id'
})

const answerSchema = new Schema('answers', {
  idAttribute: '_id'
})

const pkgSchema = new Schema('pkgs', {
  idAttribute: '_id'
})

const materialSchema = new Schema('materials', {
  idAttribute: '_id'
})

userSchema.define({
  courseInstances: arrayOf(courseInstanceSchema),
  universities: arrayOf(universitySchema),
  programs: arrayOf(programSchema),
  followings: arrayOf(userSchema),
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
})

materialSchema.define({
  pkg: pkgSchema,
})

export {
  userSchema,
  universitySchema,
  programSchema,
  courseSchema,
  questionSchema,
  courseInstanceSchema,
  materialSchema
}
