import styled from 'styled-components';

const PageTitle = styled.h1`
  font-size: 50px;
  padding: 0;
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export default PageTitle;
