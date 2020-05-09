import styled from 'styled-components';

const BaseButton = styled.button`
  display: inline-flex;
  overflow: hidden;
  padding: 8px 16px;
  margin: 2px;

  cursor: pointer;
  user-select: none;

  transition: all 150ms linear;
  text-align: center;
  white-space: nowrap;

  text-decoration: none;
  text-transform: capitalize;

  background : none;

  border: 0 none;
  border-radius: 2px;

  font-size: 15px;
  font-weight: 500;
  line-height: 1.3;

  -webkit-appearance: none;
  -moz-appearance:    none;
  appearance:         none;

  justify-content: center;
  vertical-align: middle;

  align-items: center;

  &:hover {
    transition: all 150ms linear;
    opacity: .85;
  }

  &:active {
    transition: all 150ms linear;
    opacity: .75;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: .50;
    &:hover {
      opacity: .50;
    }
  }
`;

export default BaseButton;
