import React from 'react';
import { Item, Input, Icon } from 'native-base';

export default (props) => {
  const {
    input, label, type, meta: { touched, error }
  } = props;
  let iconName;
  let secureText = false;
  switch (input.name) {
    case 'password': // fall through, same icon
    case 'confirmPassword':
      secureText = true;
      iconName = 'unlock';
      break;
    case 'token': // fall through, same icon
    case 'pin':
      secureText = true;
      iconName = 'key';
      break;
    case 'email':
    case 'username':
    case 'firstname':
    case 'lastname':
      iconName = 'person';
      break;
    case 'price':
      iconName = 'pricetags';
      break;
    case 'quantity':
      iconName = 'stats';
      break;
    default:
      iconName = 'text';
  }
  return (
    <Item error={error && touched}>
      <Icon active name={iconName} />
      <Input
        type={type}
        placeholder={label}
        secureTextEntry={secureText}
        {...input}
      />
    </Item>
  );
};
