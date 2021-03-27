import React from 'react';
import styled from 'styled-components';
import { DeepMap, FieldError } from 'react-hook-form';
import { Message } from 'rsuite';

import { Inputs } from '../../page/Types/Input';

type Props = {
  name?: string;
  placeholder?: string;
  type?: 'password' | 'email' | 'text';
};
export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <InputField
    ref={ref}
    name={props.name}
    placeholder={props.placeholder}
    type={props.type}
  />
));

export function getValidationMessages(errors: DeepMap<Inputs, FieldError>) {
  if (errors.email || errors.password || errors.fullname) {
    return (
      <Message
        style={{ marginBottom: 20 }}
        showIcon
        type="error"
        description="Field tidak boleh kosong."
      />
    );
  }
}

export const InputField = styled.input`
  display: block;
  width: 100%;
  color: #575757;
  background-color: #fff;
  border: 1px solid #e5e5ea;
  border-radius: 6px;
  padding: 7px 11px;
  font-size: 14px;
`;
