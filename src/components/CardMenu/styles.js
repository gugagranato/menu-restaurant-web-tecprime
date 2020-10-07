import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { shade } from 'polished';

export const Container = styled.div`
  margin:  0 auto;
  display: flex;
  margin:  auto;
  justify-content: center;
  margin-top: 60px;

`;

export const CardButton = styled(Button)`
  background-color: white;
  margin: 10px;
  display: flex;
  justify-content: center;
  width: 120px;
  align-items: center;
  border: solid;
  padding: 30px 20px 30px 20px;
  border-width: thin;
  font-weight: 500;
  border-color: #cfe6f9;
  transition: color 0.8s;
  color: #0e1563;

  &:hover {
        color: ${shade(0, '#0e1563')};
        background-color: ${shade(0, '#f0f8ff')};
        font-weight: bold;
        border-color: ${shade(0, '#f0f8ff')}
      }
`

export const TextButton = styled.p`

`
