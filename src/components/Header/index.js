import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import { useAuth } from '../../hooks/auth';

import logo from '../../assets/logo.png';

import { Container, ContainerLogo, ContainerMenu, ContainerModal, TitleModal, TitleDescription, ButtonCompany, ContainerSocial } from './styles';
import { IoLogoLinkedin, IoMdPaper } from 'react-icons/io';
import { FiGithub } from 'react-icons/fi';
import { AiOutlinePoweroff } from 'react-icons/ai';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const cv = 'https://docs.google.com/document/d/1ZYVGHGn3OTivNxl45cMJCdAbxx29iBYMIIkEHV-n6Cs/edit#heading=h.x8fm1uorkbaw';
const linkedin = 'https://linkedin.com/in/gustavo-granato';
const github = 'https://github.com/gugagranato';

function Header() {
  const { signOut } = useAuth();
  const classes = useStyles();

  const [openChallenge, setOpenChallenge] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const handleOpenChallenge = () => {
    setOpenChallenge(true);
  };
  const handleOpenCompany = () => {
    setOpenCompany(true);
  };
  const handleOpenProfile = () => {
    setOpenProfile(true);
  };

  const handleCloseChallenge = () => {
    setOpenChallenge(false);
  };
  const handleCloseCompany = () => {
    setOpenCompany(false);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const handleLogout = () => {
    setTimeout(function () {
      signOut();

    }, 1500);
    toast.success('Logout efetuado com sucesso.', 'Volte sempre!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <Container>
        <ContainerLogo>
          <img src={logo} style={{
            width: '250px',
            marginTop: '25px'
          }} />
        </ContainerLogo>
        <ContainerMenu>
          <Button style={{ height: 30, marginRight: 10 }} variant="outlined" color="primary" onClick={handleOpenChallenge}>

            O desafio
          </Button>
          <Button style={{ height: 30, marginRight: 10 }} variant="outlined" color="primary" onClick={handleOpenCompany}>Tecprime</Button>
          <Button style={{ height: 30, marginRight: 10 }} variant="outlined" color="primary" onClick={handleOpenProfile}>O candidato</Button>
          <Button style={{ height: 30, marginRight: 10, fontWeight: 600 }} variant="outlined" color="primary" onClick={handleLogout}>
            <AiOutlinePoweroff size={18} color={'#0e1563'} style={{ marginRight: 6 }} />

            Sair
          </Button>
        </ContainerMenu>
      </Container>

      {/* Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openChallenge}
        onClose={handleCloseChallenge}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openChallenge}>
          <ContainerModal className={classes.paper}>
            <TitleModal id="transition-modal-title">O Desafio</TitleModal>
            <TitleDescription id="transition-modal-description">O objetivo deste desafio é criar uma aplicação que <strong>apresente o cardápio de uma lanchonete</strong> e permita ao cliente <strong>fazer um pedido.</strong></TitleDescription>
            <TitleDescription id="transition-modal-description">Ao entrar, o usuário deverá visualizar as categorias de produtos e, ao clicar em uma categoria, deverá visualizar os produtos dessa categoria.</TitleDescription>
            <img src="https://i.pinimg.com/originals/89/ef/54/89ef54ef1f4de939d6f22e3fb7033330.gif" width="160px" style={{ marginTop: 10, marginBottom: 10 }} />
          </ContainerModal>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openCompany}
        onClose={handleCloseCompany}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openCompany}>
          <ContainerModal className={classes.paper}>
            <TitleModal id="transition-modal-title">A Tecprime</TitleModal>
            <TitleDescription id="transition-modal-description">Há 14 Anos anos no mercado, somos uma empresa de <strong>Outsourcing, Fábrica de software e Consultoria</strong> que apoia seus clientes na melhoria contínua de seus processos
            com o uso de ferramentas de gestão. Atuamos desde o levantamento das necessidades iniciais até a adequação e reformulação dos processos internos, além do desenvolvimento de sistemas específicos,
            integrações e customizações diversas.
            </TitleDescription>
            <TitleDescription>Ao longo dos anos, multiplicamos nossa experiência em vários segmentos de negócios com todos os clientes que atendemos e com nossa equipe de colaboradores que estão em constante aprendizado e
              que são fundamentais para nos ajudar a suprir a grande demanda de serviços.</TitleDescription>
            <ButtonCompany target="_blank" href="http://tecprime.com.br">Ir para o site</ButtonCompany>
          </ContainerModal>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openProfile}
        onClose={handleCloseProfile}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openProfile}>
          <ContainerModal className={classes.paper}>
            <TitleModal id="transition-modal-title">O Candidato</TitleModal>
            <TitleDescription id="transition-modal-description" style={{ display: 'flex', justifyContent: 'center' }} >Front-end Developer com três anos de experiência. CEO Pet Attend, apaixonado pelo Santos F.C e
            entusiasta por novas tecnologias, investimentos e blockchain.
            </TitleDescription>
            <TitleDescription><strong>Alguns perfis</strong>
            </TitleDescription>
            <ContainerSocial>
              <a href={linkedin}>
                <IoLogoLinkedin size={20} style={{ marginRight: 4 }} />
                LinkedIn</a>
              <a href={linkedin}><FiGithub size={20} style={{ marginRight: 4 }} />GitHub</a>
              <a href={linkedin}><IoMdPaper size={20} style={{ marginRight: 4 }} />Currículo</a>
            </ContainerSocial>
          </ContainerModal>
        </Fade>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Header;
