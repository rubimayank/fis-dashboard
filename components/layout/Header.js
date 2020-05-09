import React from 'react';
import styled from 'styled-components';
import { useToggle } from 'react-use';
import dayjs from 'dayjs';
import {
  MdExpandMore,
  MdExpandLess,
} from 'react-icons/md';

import BaseButton from '../BaseButton';

const HeaderWrapper = styled.header`
  height: 80px;
  background: #000;
  color: #fff;
  display: flex;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: 0 26px;
  border-right: solid 2px gray;
  > img {
    height: 40px;
    width: auto;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 0 26px;
  flex: 1;
  border-right: solid 2px gray;
  font-size: 20px;
`;

const RightNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 20px 26px;
`;

const User = styled(BaseButton)`
  color: #fff;
  font-weight: bold;
  margin: 0;
  padding: 0;
  justify-content: space-between;
`;

const LoginDate = styled.small`
  color: gray;
`;

function Header() {
  const [userMenuOpen, userMenuToggle] = useToggle(false);
  return (
    <HeaderWrapper>
      <Logo>
        <img src='/logo.png' alt='First Citizens' />
      </Logo>
      <Title>
        <span>Help Us To Serve You Better</span>
      </Title>
      <RightNav>
        <User onClick={userMenuToggle}>
          <span>Rubita Kumari</span>
          {userMenuOpen ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
        </User>
        <LoginDate>{`Last Login: ${dayjs().format('DD MMM YYYY h:mm a')}`}</LoginDate>
      </RightNav>
    </HeaderWrapper>
  );
}

export default Header;
