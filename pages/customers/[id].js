import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAsync } from 'react-use';
import styled from 'styled-components';

import UserDrawer from '../../components/UserDrawer';
import BaseButton from '../../components/BaseButton';

const Nav = styled.nav`
`;

const NavItem = styled(BaseButton)`
  cursor: pointer;
  font-size: 26px;
  color: #bdcad9;
  font-weight: bold;
  &:hover {
    color: #84a5f9;
  }
  ${(props) => props.active && `
    color: #84a5f9;
  `}
`;

const PlaceHolder = styled.div`
  margin-top: 16px;
  width: 300px;
  height: 580px;
  background: #d9e7f6;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: #bdcad9;
  font-weight: bold;
  border-radius: 4px;
`;

const pageNames = {
  accounts: 'Accounts',
  sms: 'SMS & Alerts',
  contacts: 'Contacts',
  alerts: 'Manage Alerts',
  apps: 'Apps',
};

function Customer({ userService }) {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState('accounts');

  const userPromise = useAsync(() => {
    if (userService) {
      return userService.get(id);
    }
    return Promise.reject();
  }, [userService]);

  const { value: user } = userPromise;

  if (!user) {
    return <></>;
  }
  return (
    <>
      <UserDrawer user={user} />
      <Nav>
        {Object.keys(pageNames).map((key) => (
          <NavItem
            key={key}
            onClick={() => setPage(key)}
            active={key === page}
          >
            {pageNames[key]}
          </NavItem>
        ))}
      </Nav>

      <PlaceHolder>
        {pageNames[page]}
      </PlaceHolder>
    </>
  );
}

export default Customer;
