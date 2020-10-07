import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { MdAttachMoney } from 'react-icons/md';
import { MdRemoveShoppingCart } from 'react-icons/md';

import { Container, ContainerNotItens, WrapperNotItens, WrapperContent, BackButton, WrapperDetails, ContainerTotal, WrapperTotal, ButtonConfirm } from './styles';
import { FiLogIn, FiMinusCircle, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { Button } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function Cart() {

  const history = useHistory();
  const classes = useStyles();
  const [currentCart, setCurrentCart] = useState([]);
  const [baseURL, setBaseUrl] = useState('');

  useEffect(() => {
    api.get('categorias')
      .then(res => {
        setBaseUrl(res.config.baseURL)
      });

    const cart = localStorage.getItem('cart');

    setCurrentCart(JSON.parse(cart))


  }, [setBaseUrl, setCurrentCart])

  const handleConfirm = () => {
    setTimeout(function () {
      localStorage.removeItem('cart');
      setCurrentCart()
      history.push('/')

    }, 1500);
    toast.success('🔥 Pedido confirmado', {
      position: "top-right",
      autoClose: 1400,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function onChangeQuantity(i, type) {
    const newCart = currentCart.map((item, index) => {
      if (i !== index) return item;
      if (type) return { ...item, quantity: item.quantity + 1 };
      if (item.quantity >= 2) return { ...item, quantity: item.quantity - 1 };
      if (item.quantity === 1) return null;
    }).filter(item => item !== null);
    localStorage.setItem('cart', JSON.stringify(newCart))
    setCurrentCart(newCart)
  }

  const onLoadTotal = () => {
    let total = 0;

    const cart = currentCart;
    for (var i = 0; i < cart.length; i++) {
      total = total + (cart[i].food.price * cart[i].quantity)
    }
    return total
  }

  return (
    <>
      <Header />
      <WrapperContent>
        <h1 style={{ color: '#0e1563' }}>Pedido:</h1>
        <Link to="/signup">
          <BackButton>
            <FiLogIn size={18} style={{ marginRight: 6 }} />
            <p>Voltar</p>
          </BackButton>
        </Link>
      </WrapperContent>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {currentCart ? currentCart.map((item, i) => (
            <Grid key={item.id} item xs={12}>
              <Paper className={classes.paper}>
                <Container>
                  <div>
                    <img alt="TestTecprime" src={baseURL + item.food.image.url} width="100px" />
                    <div>
                      <p style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>{item.food.name}</p>
                    </div>
                  </div>
                  <WrapperDetails>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',

                    }} >
                      <p style={{ fontWeight: 600 }} >Quantidade: </p>
                      {item.quantity < 1 ?
                        <Button disabled >
                          <FiTrash2 size={18} color={'#9294a3'} />
                        </Button>
                        :
                        <Button onClick={() => onChangeQuantity(i, false)} >
                          <FiMinusCircle size={18} color={'#0e1563'} />
                        </Button>
                      }

                      <p>{item.quantity}</p>

                      <Button onClick={() => onChangeQuantity(i, true)} >
                        <FiPlusCircle size={18} color={'#0e1563'} />
                      </Button>


                      <p style={{ fontWeight: 600 }}>R$ {item.food.price * item.quantity}</p>
                    </div>

                  </WrapperDetails>
                </Container>
              </Paper>
            </Grid>
          )
          ) : <ContainerNotItens>
              <WrapperNotItens>
                <MdRemoveShoppingCart size={100} color={'#0e1563'} style={{ marginBottom: 20 }} />
                <p>Não há itens no carrinho</p>
              </WrapperNotItens>
            </ContainerNotItens>
          }

          {currentCart ?
            currentCart.map(item => (
              <ContainerTotal key={item.id}>
                <WrapperTotal>
                  <div>
                    Total:
                </div>
                  <div>
                    <ButtonConfirm onClick={() => handleConfirm()} >
                      <MdAttachMoney size={22} />
                    Finalizar pedido
                  </ButtonConfirm>
                  </div>
                  <div>
                    R$ {onLoadTotal()}
                  </div>
                </WrapperTotal>
              </ContainerTotal>
            ))

            : null}
        </Grid>
      </div>

      <ToastContainer />
    </>
  )

}

export default Cart;
