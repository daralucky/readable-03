import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { MyInputGroup, MyTextAreaGroup, MySubmitButtonGroup } from '../utils/MyUIComponents'

//Validation rules
const required = value => (value ? undefined : 'Required')

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

const maxLength50 = maxLength(50)

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minLength3 = minLength(3)
export const minLength5 = minLength(5)

const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined

const CommentForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">

    <Field
        isHorizontal={true}
        name="author"
        type="text"
        component={MyInputGroup}
        label="Author"
        validate={[required, maxLength50, minLength3]}
        warn={alphaNumeric}
      />

      <Field
        isHorizontal={true}
        name="body"
        component={MyTextAreaGroup}
        row='5'
        label="Body"
        validate={[required, minLength5]}
      />

      <MySubmitButtonGroup submitting={submitting} pristine={pristine} reset={reset} />

    </form>
  )
}

export default reduxForm({
  form: 'commentForm' // a unique identifier for this form
})(CommentForm)
