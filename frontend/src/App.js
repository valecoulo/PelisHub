import React,{useEffect,useState} from "react";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {useSelector, useDispatch} from 'react-redux'

import usuarioActions from "./redux/actions/usuarioActions";

import NavBarMain from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

import Inicio from "./pages/Inicio"
import Peliculas from './pages/Peliculas'
import Registro from './pages/Registro'
import Loguearse from './pages/Loguearse'
import Ficha from "./pages/Ficha";


function App() {

  const dispatch = useDispatch()
  const usuario = useSelector(state => state.usuarioReducer._id)
  const token = localStorage.getItem('token')
  useEffect(() => {
   (token && !usuario) && dispatch(usuarioActions.iniciarConToken(token))

  }, [])



  return (
    <BrowserRouter>
    <div className="container-fluid">
      <NavBarMain/>
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/Peliculas" element={<Peliculas />}></Route>
        <Route path='/Peliculas/:id' element={<Ficha />}></Route>
        {!usuario && <Route path="/Registro" element={<Registro />}></Route>}
        {!usuario && <Route path="/IniciarSesion" element={<Loguearse />}></Route>}
        <Route path='*' element={<Inicio />}></Route>
      
      </Routes>
      <Footer/>
    </div>
      <ToastContainer
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
        />
      <ToastContainer /> 

    </BrowserRouter>
  );
}

export default App;
