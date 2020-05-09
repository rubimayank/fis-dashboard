import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {
  AiOutlineUpCircle,
  AiOutlineDownCircle,
  AiOutlineSearch,
} from 'react-icons/ai';
import {
  RiFileUserLine,
} from 'react-icons/ri';
import {
  GoLocation,
} from 'react-icons/go';
import { useToggle } from 'react-use';

import Tab from './Tab';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transition: all 150ms linear;
  width: 100%;
  z-index: 1;
`;

const Card = styled.div`
  transition: all 150ms linear;
  overflow: hidden;
  height: 0;
  background: #fff;
  ${(props) => props.visible && `
    height: 300px;
  `}
`;

const CardBody = styled.div`
  padding: 20px 40px;
  background: #fff;
`;

const Handle = styled.div`
  transition: all 150ms linear;
  border-top: solid 8px #4a92d8;
  display: flex;
  &:before {
    content: '';
    flex: 1;
  }
  &:after {
    content: '';
    width: 60px;
  }
`;

const CardTitle = styled.span`
  font-size: 20px;
  color: #105aa8;
  display: flex;
  > svg {
    margin-right: 8px;
  }
  margin-bottom: 8px;
`;

const InfoRow = styled.div`
  display: flex;
  padding-bottom: 20px;
`;

const InfoTile = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
`;

const InfoLabel = styled.span`
  color: #777;
  font-size: 14px;
`;

const InfoValue = styled.span`
  font-weight: bold;
`;

const Hr = styled.hr`
    margin-bottom: 24px;
    height: 1px;
    border: 0;
    background: rgb(255,255,255); /* Old browsers */
  background: -moz-linear-gradient(left,  rgba(255,255,255,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 51%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,  rgba(255,255,255,1) 0%,rgba(0,0,0,1) 50%,rgba(0,0,0,1) 51%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,  rgba(255,255,255,1) 0%,rgba(0,0,0,1) 50%,rgba(0,0,0,1) 51%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff',GradientType=1 ); /* IE6-9 */
`;

const Drawer = styled.div`
  z-index: 3;
`;

function UserDrawer({ user }) {
  const [visible, toggle] = useToggle(false);
  const {
    cid,
    firstName,
    lastName,
    dob,
    employer,
    jobTitle,
    address,
    city,
    country,
  } = user;
  return (
    <Wrapper>
      <Drawer>
        <Card visible={visible}>
          <CardBody>
            <CardTitle>
              <RiFileUserLine />
              Personal Information
            </CardTitle>
            <InfoRow>
              <InfoTile>
                <InfoLabel>Full Name</InfoLabel>
                <InfoValue>{`${firstName} ${lastName}`}</InfoValue>
              </InfoTile>
              <InfoTile>
                <InfoLabel>Customer Id</InfoLabel>
                <InfoValue>{cid}</InfoValue>
              </InfoTile>
              <InfoTile>
                <InfoLabel>Identification Number</InfoLabel>
                <InfoValue>ZEID_###</InfoValue>
              </InfoTile>
              <InfoTile>
                <InfoLabel>Driver's Permit</InfoLabel>
                <InfoValue>ZDP_###</InfoValue>
              </InfoTile>
            </InfoRow>
            <InfoRow>
              <InfoTile>
                <InfoLabel>Passport</InfoLabel>
                <InfoValue>ZPP_###</InfoValue>
              </InfoTile>
              <InfoTile>
                <InfoLabel>Date of Birth</InfoLabel>
                <InfoValue>{dayjs(dob).format('YYYY-MM-DD')}</InfoValue>
              </InfoTile>
              <InfoTile>
                <InfoLabel>Current Employer</InfoLabel>
                <InfoValue>{employer}</InfoValue>
              </InfoTile>
              <InfoTile>
                <InfoLabel>Occupation</InfoLabel>
                <InfoValue>{jobTitle}</InfoValue>
              </InfoTile>
            </InfoRow>
            <Hr />
            <CardTitle>
              <GoLocation />
              Home Address
            </CardTitle>
            <InfoRow>
              <InfoTile>
                <InfoLabel>Address</InfoLabel>
                <InfoValue>{address}</InfoValue>
              </InfoTile>
              <InfoTile>
                <InfoLabel>Customer Id</InfoLabel>
                <InfoValue>{city}</InfoValue>
              </InfoTile>
              <InfoTile>
                <InfoLabel>Country</InfoLabel>
                <InfoValue>{country}</InfoValue>
              </InfoTile>
            </InfoRow>
          </CardBody>
        </Card>
        <Handle>
          <Tab
            prefix={visible ? <AiOutlineUpCircle size={20} /> : <AiOutlineDownCircle size={20} />}
            label={`${firstName} ${lastName} (${cid})`}
            suffix={<AiOutlineSearch size={20} />}
            onClick={toggle}
          />
        </Handle>
      </Drawer>
    </Wrapper>
  );
}

export default UserDrawer;
