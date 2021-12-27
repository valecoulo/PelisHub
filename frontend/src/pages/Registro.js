import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';


const Registro = () => {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <div className="form-container">

          <h1>Registrate</h1>


            <TextField
              label="Email"
              id="filled-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              variant="filled"
            />
             <TextField
              label="Nombre"
              id="filled-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              variant="filled"
            />
             <TextField
              label="Apellido"
              id="filled-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              variant="filled"
            />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
             <TextField
              label="URL de pelicula"
              id="filled-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              variant="filled"
            />

            <Button className="button-send" variant="contained" endIcon={<SendIcon />}>
                Send
           </Button>
          </div>
        </Box>
      )
}

export default Registro