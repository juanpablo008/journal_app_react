import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import { useMemo } from 'react';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio'],
  email: [ (value) => value.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1, 'El correo debe tener el formato correcto'],
  password: [ (value) => value.length >= 6, 'La contraseña debe de tener más de 6 caracteres'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false)

  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid      
  } = useForm(formData, formValidations);

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const onSubmit = e => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title="Crear Cuenta">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Pepito"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={formSubmitted ? displayNameValid : formSubmitted}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@correo.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted ? emailValid : formSubmitted}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={formSubmitted ? passwordValid : formSubmitted}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={ !!errorMessage ? '' : 'none' }>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button disabled={isCheckingAuthentication} type='submit' variant='contained' fullWidth>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
