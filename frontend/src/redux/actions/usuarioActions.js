import axios from 'axios';
import Swal from 'sweetalert2';

const Alert = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    background: 'black',
    color: 'white',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


const usuarioActions = {
    nuevoUsuario: (usuario) => {
        return async (dispatch) => {
            console.log(usuario)
            try {
                const respuesta = await axios.post('https://pelishub.herokuapp.com/api/user/registrarse', {...usuario})
                

                if(respuesta.data.success) {
                    localStorage.setItem('token', respuesta.data.response.token)
                    dispatch({ type: 'LOGUEADO', payload: respuesta.data.response })
                    return respuesta.data
                } else {
                    console.log(respuesta)
                    console.log('error en el registro');
                    return respuesta.data
                }
            } catch(err) {
                console.log(err);
            }
        }
    },
    loguearse: (datosUsuario) => {
        return async (dispatch) => {
            console.log(datosUsuario)
            try {
                const respuesta = await axios.post('https://pelishub.herokuapp.com/api/user/ingresar', { ...datosUsuario })
                console.log(respuesta);

                
                if(respuesta.data.success) {
                    localStorage.setItem('token', respuesta.data.response.token)
                    dispatch({ type: 'LOGUEADO', payload: respuesta.data.response })
                    console.log(respuesta.data)
                    return respuesta.data
                } else {
                    console.log('esta mal pa');
                    return respuesta.data
                }
            } catch(err) {
                console.log(err);
            }
        }
    },
    desloguearse:() => {
        return (dispatch) => {
            localStorage.clear()
            Alert.fire({
                title: 'PelisHub',
                text: 'Saliste de sesión',
                icon: 'success'
            })
            dispatch({ type: 'DESLOGUEARSE', payload: {}})
        }
    },
    iniciarConToken:  (token) =>{
        return async (dispatch) => {
            try{
                let respuesta = await axios.get('https://pelishub.herokuapp.com/api/verifyToken', {
            headers: {
                Authorization: 'Bearer '+ token,
            }
        })
        console.log(respuesta)
            dispatch({type:"LOGUEADO", payload:{token, nombre:respuesta.data.response.nombre, foto: respuesta.data.response.foto, _id:respuesta.data.response._id, rol:respuesta.data.response.rol, apellido: respuesta.data.response.apellido, peliculasLikeadas: respuesta.data.response.peliculasLikeadas}})
            }catch(error) {
              console.log(error);
            }
        }
    },
    editarUsuario: (id, datosUsuario) => {
        return async (dispatch) => {
            try {
                const respuesta = await axios.put('https://pelishub.herokuapp.com/api/user/'+id, { ...datosUsuario })

                if(respuesta.data.success) {
                    
                    dispatch({ type: 'LOGUEADO', payload: datosUsuario })
                    return respuesta.data

                } else {
                    console.log('Esto no resultó.');
                    return respuesta.data
                }
            } catch(err) {
                console.log(err);
            }
        }
    },
    agregarAFavoritos: (id,idPelicula) => {
        return async(dispatch)=>{
            try{
                const respuesta = await axios.put('https://pelishub.herokuapp.com/api/usuario/like/'+id,{idPelicula:idPelicula})

                if(respuesta.data.success){
                    dispatch({ type: 'LOGUEADO', payload: {peliculasLikeadas:respuesta.data.response}})
                }else{
                    Alert.fire({
                        title: 'PelisHub',
                        text: 'Tienes que estar logueado para agregar a tus preferencias',
                        icon: 'error'
                    })
                }
            }catch(err){
                console.log(err)
            }
        }
    }

}

export default usuarioActions

