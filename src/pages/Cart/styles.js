import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;

  p {
    display: flex;
    align-items: center;
    color: #0e1563;
  }
`
export const ContainerNotItens = styled.div`
  display: flex;
  flex:  1;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 20px;

`;

export const WrapperNotItens = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
    align-items: center;

    p{
      font-size: 18px;
      font-weight: 500;
    }
`;

export const WrapperContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin: 0 80px 10px 80px;
`

export const BackButton = styled(Button)`
  border: 1px solid #3f51b5;
  border-width: thin;
  color: #3f51b5;
  transition: color 0.8s;

  &:hover {
    color: ${shade(0, '#fff')};
    background-color: ${shade(0, '#0e1563')};
  }

  p{

    text-decoration:none;
  }
`

export const WrapperDetails = styled.div`
margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
`
export const ContainerTotal = styled.div`

position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    height: 80px;

`
export const WrapperTotal = styled.div`
display: flex;
flex: 1;
justify-content: space-evenly;
align-items: center;
border-top: solid 0.5px #0e1563;
background-color: #0e1563;
color: white;
font-size: 20px;
`

export const ButtonConfirm = styled(Button)`
  border: 1px solid #FFF;
  color: #FFF;

   &:hover {
    background-color: ${shade(0, '#FFF')};
    color: ${shade(0.3, '#0e1563')};
    font-weight: 600;
  }

`
export const ContainerButtonModalRemove = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
`
export const ButtonRemove = styled(Button)`
  border: solid thin #0e1563;
  color: #0e1563;

   &:hover {
    background-color: ${shade(0.1, '#f0f8ff')};
    color: ${shade(0.3, '#0e1563')};
    font-weight: 600;
  }

`
export const ButtonCancel = styled(Button)`
  color: #0e1563;

   &:hover {
    background-color: ${shade(0.1, '#f0f8ff')};

  }

`
