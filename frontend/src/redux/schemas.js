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

const questionSchema = new Schema('questions', {
  idAttribute: '_id'
})

userSchema.define({
  courses: arrayOf(courseSchema),
  university: universitySchema,
  program: programSchema,
})

programSchema.define({
  university: universitySchema,
})

courseSchema.define({
  prof: userSchema,
  university: universitySchema,
  program: programSchema,
})

export {
  userSchema,
  universitySchema,
  programSchema,
  courseSchema,
  questionSchema,
}
