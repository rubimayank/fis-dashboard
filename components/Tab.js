import React from 'react';
import styled from 'styled-components';

import BaseButton from './BaseButton';

const TabWrapper = styled(BaseButton)`
  display: flex;
  overflow: hidden;
  padding: 0;
  margin: 0;
  padding-left: 10px;
  padding-right: 10px;
  &:before {
    content: '';
    width: 30px;
    height: 100%;
    background: #4a92d8;
    -moz-transform: skew(20deg, 0deg);
    -webkit-transform: skew(20deg, 0deg);
    -o-transform: skew(20deg, 0deg);
    -ms-transform: skew(20deg, 0deg);
    transform: skew(20deg, 0deg);
    border: 1px solid #4a92d8;
    margin-right: -10px;
    border-bottom-left-radius: 12px;
  }
  &:after {
    content: '';
    width: 30px;
    height: 100%;
    background: #4a92d8;
    -moz-transform: skew(-20deg, 0deg);
    -webkit-transform: skew(-20deg, 0deg);
    -o-transform: skew(-20deg, 0deg);
    -ms-transform: skew(-20deg, 0deg);
    transform: skew(-20deg, 0deg);
    border: 1px solid #4a92d8;
    margin-left: -10px;
    border-bottom-right-radius: 12px;
  }
`;

const TabContent = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  background: #4a92d8;
  text-transform: uppercase;
  font-weight: bold;
  padding: 12px;
  > span {
    height: 100%;
    display: block;
    padding-right: 12px;
    &:last-child {
      padding-right: 0;
    }
  }
`;

function Tab({
  label, prefix, suffix, onClick,
}) {
  return (
    <TabWrapper onClick={onClick}>
      <TabContent>
        {prefix && <span>{prefix}</span>}
        {label && <span>{label}</span>}
        {suffix && <span>{suffix}</span>}
      </TabContent>
    </TabWrapper>
  );
}

export default Tab;
