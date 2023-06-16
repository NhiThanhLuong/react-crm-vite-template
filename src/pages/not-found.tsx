import { Typography } from 'antd';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <Wrapper>
      <Title>
        4
        <span role="img" aria-label="Crying Face">
          😢
        </span>
        4
      </Title>
      <Typography>Page not found.</Typography>
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled(Typography)`
  margin-top: -8vh;
  font-weight: bold;
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;

export const P = styled(Typography)`
  font-size: 1rem;
  line-height: 1.5;
  margin: 0.625rem 0 1.5rem 0;
`;
