import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import Header from '../../components/Header';
import CardMenu from '../../components/CardMenu';

import bannerImg from '../../assets/banner-4.jpg'

import 'react-toastify/dist/ReactToastify.css';
import { BannerContainer, TitleCategories, ContainerAllProducts } from './styles'
import { FiZoomIn } from 'react-icons/fi';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Dashboard = () => {
  const classes = useStyles();


  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectCategories, setSelectCategories] = useState(0);
  const [baseUrl, setBaseUrl] = useState('');
  const [loadAllItens, setloadAllItens] = useState(false);
  const [loadCategoriesSelected, setLoadCategoriesSelected] = useState(false);


  useEffect(() => {
    api.get('categorias')
      .then(res => {
        setBaseUrl(res.config.baseURL)
        setCategories(res.data);
      });
    api.get('products')
      .then(response => {
        setProducts(response.data)
      });
  }, [setCategories, setProducts]);


  const handleteste = item => {
    console.log(item);

    setSelectCategories(item)
    setloadAllItens(false);
    setLoadCategoriesSelected(true)

  }

  const handleAllProducts = () => {
    setloadAllItens(true);
    setLoadCategoriesSelected(false);
  }

  const onClickAddCart = (data) => {
    console.log('asdf', data)
    const itemCart = {
      id: uuidv4(),
      food: data,
      quantity: 1,
    }

    const dataCart = localStorage.getItem('cart');

    if (dataCart !== null) {

      const cart = JSON.parse(dataCart);
      cart.push(itemCart);
      localStorage.setItem('cart', JSON.stringify(cart))

      toast.success('🔥 Produto adicionado com sucesso', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      const cart = []
      cart.push(itemCart)
      localStorage.setItem('cart', JSON.stringify(cart));
      toast.success('🔥 Produto adicionado com sucesso', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }
  console.log('categoriaselecionada', selectCategories)

  return (
    <>
      <Header />
      {/* <Banner /> */}
      <BannerContainer >
        <img src={bannerImg} width={'100%'} alt="BannerFood" />
      </BannerContainer>
      <TitleCategories>Categorias</TitleCategories>
      <div style={{ display: 'flex', justifyContent: 'center' }} >
        {categories.map((item) => {
          return (
            <div key={item.id} style={{ margin: 5 }}>
              <button
                onClick={() => handleteste(item.id)}
              >
                <img alt="TestTecprime" src={baseUrl + item.image.url} style={{ width: 140, height: 100 }} />
              </button>
              <p>{item.name}</p>
            </div>
          )
        })}

      </div>
      <CardMenu />

      <ContainerAllProducts>
        <Button onClick={() => handleAllProducts()} style={{ color: '#0e1563' }} >
          Ver todos os produtos
          <FiZoomIn size={20} style={{ marginLeft: 4 }} />
        </Button>
      </ContainerAllProducts>

      {
        loadAllItens && (

          <div className={classes.root}>
            <Grid container spacing={3}>
              {products.map(event => {
                return (
                  <Grid key={event.id} item xs={3}>
                    <Paper className={classes.paper}>
                      <img alt="TestTecprime" src={baseUrl + event.image.url} style={{ width: 140, height: 100 }} />
                      <p>{event.name}</p>
                      <p>{event.price}</p>
                      <Button style={{ height: 30, marginRight: 10, marginTop: 5 }} variant="outlined" color="primary" onClick={() => onClickAddCart(event)}>
                        Adicionar
                      </Button>
                    </Paper>
                  </Grid>
                )
              })}
            </Grid>
          </div>
        )
      }

      <ToastContainer />

      <div className={classes.root}>
        <Grid container spacing={3}>
          {loadCategoriesSelected && products.filter(product => {
            return product.categoria.id === selectCategories
          }).map(event => (
            <Grid key={event.id} item xs={3}>
              <Paper className={classes.paper}>
                <img alt="TestTecprime" src={baseUrl + event.image.url} style={{ width: 140, height: 100 }} />
                <p>{event.name}</p>
                <p>{event.price}</p>
                <Button style={{ height: 30, marginRight: 10, marginTop: 5 }} variant="outlined" color="primary" onClick={() => onClickAddCart(event)}>
                  Adicionar
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  )
};

export default Dashboard;
