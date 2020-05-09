import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Aside from './Aside';

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const Main = styled.div`
  flex: 1;
  background: #e4effb;
  padding: 30px;
  position: relative;
`;

function Page({ children }) {
  return (
    <Body>
      <Header />
      <Wrapper>
        <Aside />
        <Main>
          {children}
        </Main>
      </Wrapper>
    </Body>
  );
}

export default Page;
