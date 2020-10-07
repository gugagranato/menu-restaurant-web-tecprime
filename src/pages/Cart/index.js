import React, { useEffect, useState, createRef } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { MdAttachMoney } from 'react-icons/md';
import { MdRemoveShoppingCart } from 'react-icons/md';

import { Container, ContainerNotItens, WrapperNotItens, WrapperContent, BackButton, WrapperDetails, ContainerTotal, WrapperTotal, ButtonConfirm, ContainerButtonModalRemove, ButtonRemove, ButtonCancel } from './styles';
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
  const modalRef = createRef();

  const history = useHistory();
  const classes = useStyles();
  const [currentCart, setCurrentCart] = useState([]);
  const [baseURL, setBaseUrl] = useState('');
  const [openModalRemove, setOpenModalRemove] = useState(false);

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

  const handleAdd = (item, position) => {

    const dataCart = currentCart.map((cartItem, index) => {
      if (index !== position) return item;
      return { ...item, quantity: item.quantity + 1 };
    });

    let currentQuantity = currentCart[position].quantity;
    currentQuantity = currentQuantity + 1;
    dataCart[position].quantity = currentQuantity;

    localStorage.setItem('cart', JSON.stringify(dataCart))

    setCurrentCart(dataCart);

  }

  const handleRemove = (item, position) => {
    const dataCart = currentCart.map((cartItem, index) => {
      if (index !== position) return item;
      return { ...item, quantity: item.quantity - 1 };
    });

    // let currentQuantity = currentCart[position].quantity;
    // currentQuantity = currentQuantity - 1;
    // dataCart[position].quantity = currentQuantity;

    localStorage.setItem('cart', JSON.stringify(dataCart))

    setCurrentCart(dataCart);
  }

  function onChangeQuantity(i, type) {

    const dataCart = currentCart;
    let quant = dataCart[i].quantity;

    if (type) {
      quant += 1;
      dataCart[i].quantity = quant
      localStorage.setItem('cart', JSON.stringify(dataCart))
      setCurrentCart(dataCart)
    }
    else if (type == false && quant >= 2) {
      quant = quant - 1
      dataCart[i].quantity = quant
      localStorage.setItem('cart', JSON.stringify(dataCart))
      setCurrentCart(dataCart)
    }
    else if (type == false && quant == 1) {
      dataCart.splice(i, 1)
      localStorage.setItem('cart', JSON.stringify(dataCart))
      setCurrentCart(dataCart)
    }
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
                    <img src={baseURL + item.food.image.url} width="100px" />
                    <div>
                      <p>{item.food.name}</p>
                    </div>
                  </div>
                  <WrapperDetails>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',

                    }} >
                      <p style={{ fontWeight: 600 }} >Quantidade: </p>
                      {/* {item.quantity < 1 ?
                        <Button onClick={() => handleOpenModalRemove(item, i)} disabled >
                          <FiTrash2 size={18} color={'#9294a3'} />
                        </Button>
                        :
                        <Button onClick={() => handleRemove(item, i)} >
                          <FiMinusCircle size={18} color={'#0e1563'} />
                        </Button>
                      } */}

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

                      {/* <Button onClick={() => handleAdd(item, i)} >
                        <FiPlusCircle size={18} color={'#0e1563'} />
                      </Button> */}

                      <Button onClick={() => onChangeQuantity(i, true)} >
                        <FiPlusCircle size={18} color={'#0e1563'} />
                      </Button>


                      <p style={{ fontWeight: 600 }}>R$ {item.food.price}</p>
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
              <ContainerTotal>
                <WrapperTotal>
                  <div>
                    Total:
                </div>
                  <div>
                    <ButtonConfirm onClick={() => handleConfirm()}>
                      <MdAttachMoney size={22} />
                    Finalizar pedido
                  </ButtonConfirm>
                  </div>
                  <div>
                    R$ {item.quantity}
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
