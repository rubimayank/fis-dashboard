import React from 'react';
import styled from 'styled-components';
import { useToggle } from 'react-use';
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineFileText,
  AiOutlineAudit,
  AiOutlinePicture,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineAim,
} from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';

import BaseButton from '../BaseButton';

const AsideWrapper = styled.aside`
  background: #061255;
  color: #fff;
  width: 54px;
  position: relative;
  transition: all 150ms linear;
  overflow: hidden;
  ${(props) => props.open && `
    width: 196px;
  `}
`;

const Nav = styled.nav`
`;

const NavItem = styled.a`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 150ms linear;
  &:active, &:focus {
    color: #fff;
  }

  &:hover {
    background: #01051c;
  }

  ${(props) => props.active && `
    background: #01051c;
  `}
`;

const Icon = styled.div`
  transition: all 150ms linear;
  padding: 8px 16px;
  ${(props) => props.open && `
    padding: 8px;
    > svg {
      width: 18px;
    }
  `}
`;

const Label = styled.span`
  text-transform: uppercase;
  font-size: 12px;
  white-space: nowrap;
`;

const Toggle = styled(BaseButton)`
  position: absolute;
  bottom: 0;
  right: 0;
  background: none;
  border: none;
  > svg {
    fill: #fff;
  }
`;

function Aside() {
  const [open, toggle] = useToggle(false);
  const router = useRouter();
  const { pathname } = router;
  return (
    <AsideWrapper open={open}>
      <Nav>
        <Link href='/' passHref>
          <NavItem title='Dashboard' active={pathname === '/'}>
            <Icon open={open}>
              <AiOutlineAim size={24} />
            </Icon>
            <Label>Dashboard</Label>
          </NavItem>
        </Link>
        <Link href='/customers' passHref>
          <NavItem title='Customer Management' active={pathname.indexOf('/customers') === 0}>
            <Icon open={open}>
              <AiOutlineUser size={24} />
            </Icon>
            <Label>Customer Management</Label>
          </NavItem>
        </Link>
        <Link href='/reports' passHref>
          <NavItem title='Reports' active={pathname.indexOf('/reports') === 0}>
            <Icon open={open}>
              <AiOutlineFileText size={24} />
            </Icon>
            <Label>Reports</Label>
          </NavItem>
        </Link>
        <Link href='/wallpaper' passHref>
          <NavItem title='Manage Wallpaper' active={pathname.indexOf('/wallpaper') === 0}>
            <Icon open={open}>
              <AiOutlinePicture size={24} />
            </Icon>
            <Label>Manage Wallpaper</Label>
          </NavItem>
        </Link>
        <Link href='/audit' passHref>
          <NavItem title='Audit Logs' active={pathname.indexOf('/audit') === 0}>
            <Icon open={open}>
              <AiOutlineAudit size={24} />
            </Icon>
            <Label>Audit Logs</Label>
          </NavItem>
        </Link>
        <Link href='/permission' passHref>
          <NavItem title='User Permission' active={pathname.indexOf('/permission') === 0}>
            <Icon open={open}>
              <AiOutlineSetting size={24} />
            </Icon>
            <Label>User Permission</Label>
          </NavItem>
        </Link>
      </Nav>
      <Toggle onClick={toggle} title={open ? 'Hide' : 'Show'}>
        {open ? <AiOutlineMenuFold size={24} /> : <AiOutlineMenuUnfold size={24} />}
      </Toggle>
    </AsideWrapper>
  );
}

export default Aside;
