import React from 'react';

import { useHistory } from 'react-router-dom';

import { Container, CardButton, TextButton } from './styles';
import { MdRestaurantMenu } from 'react-icons/md';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
function CardMenu() {
  const history = useHistory();

  const goToCart = () => {
    history.push('/cart');
  }
  const goToProducts = () => {
    history.push('/dashboard');
  }

  return (
    <Container>
      <CardButton onClick={() => goToProducts()}>
        <TextButton>
          <MdRestaurantMenu size={20} style={{ marginRight: 5 }} />
          Produtos
        </TextButton>
      </CardButton>
      <CardButton onClick={() => goToCart()}>
        <TextButton >
          <FiShoppingCart size={20} style={{ marginRight: 5 }} />
            Carrinho
        </TextButton>
      </CardButton>
      <CardButton>
        <TextButton>
          <FiUser size={20} style={{ marginRight: 5 }} />
            Profile
        </TextButton>
      </CardButton>
    </Container>
  );
}

export default CardMenu;
