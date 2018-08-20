import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export const Header = styled.div`
  color: #314659;
  font-size: 14px;
  line-height: 1.5;
`;

export const Content = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

export const Section = styled.div`
  border: 1px solid #ebedf0;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  max-width: 350px;
  padding: 20px 30px;
  > ${Header} {
    font-size: 14px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebedf0;
  }
  > ${Content} {
    padding-top: 20px;
  }
`;

export const Option = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  > label {
    font-size: 14px;
  }
  > img {
    height: 18px;
    margin: 0 10px;
    width: 18px;
  }
  + div {
    margin-top: 20px;
  }
`;
