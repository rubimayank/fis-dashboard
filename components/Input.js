import React from 'react';
import styled from 'styled-components';
import { useToggle } from 'react-use';

const Wrapper = styled.div`
  background: #fff;
  padding: 8px 26px;
  margin: 0;
  height: 64px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  transition: all 150ms linear;
`;

const Label = styled.label`
  position: absolute;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
  color: #7f7f7f;
  font-size: 16px;
  transition: all 150ms linear;
  pointer-events: none;
  ${(props) => props.focus && `
    position: static;
    font-size: 12px;
  `}
`;

const StyledInput = styled.input`
  background: none;
  border: none;
  padding: 4px 0;
  margin: 0;
  transition: all 150ms linear;
  flex: 1;
`;

function Input({
  label, value, onBlur, onFocus,
  ...inputProps
}) {
  const [focus, toggleFocus] = useToggle(false);
  return (
    <Wrapper>
      <Label focus={focus || value !== ''}>{label}</Label>
      <StyledInput
        value={value}
        onBlur={() => {
          toggleFocus();
          if (onBlur) {
            onBlur();
          }
        }}
        onFocus={() => {
          toggleFocus();
          if (onFocus) {
            onFocus();
          }
        }}
        {...inputProps}
      />
    </Wrapper>
  );
}

export default Input;
