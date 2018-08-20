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
  > svg path {
    fill: #fff;
  }
  > h1 {
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    margin-left: 10px;
  }
`;

export const Site = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  > img {
    height: 18px;
    width: 18px;
  }
  > h2 {
    font-size: 14px;
    font-weight: 400;
    margin-left: 5px;
  }
`;

export const Container = styled.div`
  position: relative;
  ${Site} {
    left: 28px;
    padding: 0 5px;
    position: absolute;
    top: 8px;
  }
`;

export const Border = styled.div`
  border: 1px solid #ebedf0;
  margin: 20px;
`;

export const Settings = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  padding: 20px;
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
