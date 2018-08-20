import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export const Header = styled.div`
  align-items: center;
  background-color: #8160ff;
  display: flex;
  flex-direction: row;
  height: 40px;
  padding: 0 20px;
  width: 100%;
  h1 {
    color: #fff;
    font-size: 16px;
  }
`;

export const Settings = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    > label {
      font-size: 14px;
      margin-left: 10px;
    }
  }
`;
