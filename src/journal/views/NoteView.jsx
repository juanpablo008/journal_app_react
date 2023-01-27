import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormatter } from '../../helpers';
import { useForm } from '../../hooks/useForm';
import { setActiveNote, startSaveNote } from '../../store/journal';
import { ImageGallery } from '../components';

export const NoteView = () => {

  const dispatch = useDispatch();

  const { active: note} = useSelector( state => state.journal)

  const { body, title, date, onInputChange, formState } = useForm( note );

  const dateString = useMemo(() => dateFormatter(date), [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState])

  const onSaveNote = () => {
    dispatch( startSaveNote() );
  }
  

  return (
    <Grid 
      className='animate__animated animate__fadeIn animate__faster'
      container 
      direction='row' 
      justifyContent='space-between' 
      alignItems='center' 
      sx={{ mb: 1 }}
    >
      <Grid item>
        {/* <Typography fontSize={ 39 } fontWeight='light'>28 de Agosto, 2023</Typography> */}
        <Typography fontSize={ 39 } fontWeight='light' textTransform="capitalize">{dateString}</Typography>
      </Grid>
      <Grid item>
        <Button 
          color="primary" 
          sx={{ padding: 2 }}
          onClick={onSaveNote}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField  
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField  
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió hoy?"
          minRows={ 8 }
          name="body"
          value={body}
          onChange={onInputChange}
        />

      </Grid>

      <ImageGallery />

    </Grid>
  )
}