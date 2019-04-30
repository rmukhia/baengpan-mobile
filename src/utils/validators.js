const required = value => (value ? undefined : '*');
const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more` : undefined);
// const reg0 = /^[ก-๙A-Z0-9._%+-]+@[ก-๙A-Z0-9.-]/i;
const reg1 = /^[ก-๙A-Z0-9._%+-]+@[ก-๙A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const email = value => (value && !reg1.test(value)
  ? 'Invalid email address'
  : undefined);
const alphaNumeric = value => (value && /[^a-zA-Z0-9 ]/i.test(value)
  ? 'Only alphanumeric characters'
  : undefined);
const numeric = value => (value && /[^0-9]/i.test(value)
  ? 'Only numeric characters'
  : undefined);
const floatNumeric = value => (value && /^[+-]?\d+(\.\d+)?$/i.test(value)
  ? undefined
  : 'Only float-numeric characters');

// prevent infinite loop on redux-form
const minLength6 = minLength(6);
const minLength8 = minLength(8);
const maxLength16 = maxLength(16);
const minLength10 = minLength(10);
const maxLength10 = maxLength(10);
const maxLengthNote = maxLength(50);

export default {
  required,
  email,
  alphaNumeric,
  numeric,
  floatNumeric,
  minLength6,
  minLength8,
  maxLength16,
  minLength10,
  maxLength10,
  maxLengthNote,
};
