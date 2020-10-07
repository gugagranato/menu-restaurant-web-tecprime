import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  max-height: 300px;
  height: 160px;
  display: flex;
  justify-content: space-around;
`;
export const ContainerLogo = styled.div`

`;
export const ContainerMenu = styled.div`
  display: flex;
  margin-top: 40px;
  font-size: 18px;
  margin-right: center;
  p {
    margin-right: 10px;
  }

`;

export const ContainerModal = styled.div`
  width: 750px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const TitleModal = styled.h2`
  margin-bottom: 50px;
`;

export const TitleDescription = styled.p`
  margin-bottom: 14px;
`;

export const ButtonCompany = styled.a`
  background: white;
  border: solid;
  border-width: thin;
  border-radius: 3px;
  padding: 8px;
  border-width: 0.5px;
  font-size: 14px;
  font-weight: 500;
  border-color: blue;
  color: blue;
  margin-bottom: 16px;
  transition: color 0.8s;

  /* transition: 0.8s; */

  &:hover {
        color: ${shade(0, '#fff')};
        background-color: ${shade(0.4, 'blue')};
      }
`;

export const ContainerSocial = styled.div`
  display: flex;
  flex-direction: column;

  a{
    color: #4b4bff;
    border: solid;
    border-width: thin;
    padding: 8px;
    border-radius: 4px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 3px;
    text-decoration:none;
    &:hover {
        color: ${shade(0, '#fff')};
        background-color: ${shade(0.4, '#4b4bff')};
      }

  }
`
