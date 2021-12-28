import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import usuarioActions from "../redux/actions/usuarioActions";
import Swal from 'sweetalert2';
import GoogleLogin from 'react-google-login';


const Loguearse = () => {

  
  const Alert = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

  const dispatch = useDispatch();

  const mail = useRef()
  const contrasenia = useRef()

 
  const logearse = async(e) =>{
    e.preventDefault()
    if(mail.current.value != '' && contrasenia.current.value != ''){

      try{
        
        const respuesta = await dispatch(
          usuarioActions.loguearse({
            mail: mail.current.value,
            contrasenia: contrasenia.current.value,
          })
          );
          
          if(respuesta.success){
            Alert.fire({
              title: `Bienvenido ${respuesta.response.nombre}`,
              icon: 'success'
            })
            mail.current.value = ''
            contrasenia.current.value = ''
          }else{Alert.fire({
            title: respuesta.error,
            icon: 'error'
          })}
          
        }catch(err){console.log(err)}
      }else{
        Alert.fire({
          icon: 'error',
          title: 'Completa los campos',
          background: 'white'
        })
      }
  }
  /* 
  joaco_nc@yahoo.com
  */

  const responseGoogle = async (respuesta) => {
    let usuarioGoogle = {
      nombre: respuesta.profileObj.name, 
      mail: respuesta.profileObj.email,
      contrasenia: respuesta.profileObj.googleId,
      apellido: 'null',
      foto: respuesta.profileObj.imageUrl,
    }
    await dispatch(usuarioActions.loguearse(usuarioGoogle))
    .then(res => {
      if (res.success){
        Alert.fire({
            icon: 'success',
            title: 'Tu cuenta a sido creada'
          })
    }
    else{
      Alert.fire({
        title: 'No se pudo loguear con Google',
        icon: 'error'
      })
    }
    })
    .catch((error) => {
      console.log(error)
      Alert.fire({
          icon: 'error',
          title: 'You have to sign up before you log in!'
        })
  })
  }

  return (
    <Form
      className="d-flex flex-column form-container"
      variant="light"
      onSubmit={logearse}
    >
      <h1 className="text-light mb-5">Iniciar Sesion</h1>
      <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
        <Form.Label className="text-light">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={mail} />
      </Form.Group>

      <Form.Group className="mb-3 col-5" controlId="formBasicPassword">
        <Form.Label className="text-light" >Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={contrasenia} />
      </Form.Group>
      <Button className="button-send"  type="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Enviar
    </Button>

    <GoogleLogin
      clientId="1088157262762-4n3b7fopip582vdipdm7i44t6ulpbt1e.apps.googleusercontent.com"
      buttonText="Iniciar sesion con Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
  />

    </Form>
  );
};

export default Loguearse;
