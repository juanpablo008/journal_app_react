import { DeleteOutline, SaveOutlined, UploadFileOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormatter, showAlertSuccErr } from '../../helpers';
import { useForm } from '../../hooks/useForm';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';
import { ImageGallery } from '../components';
import 'sweetalert2/dist/sweetalert2.css'
import { useRef } from 'react';

export const NoteView = () => {

  const dispatch = useDispatch();

  const { active: note, messageSaved, isSaving } = useSelector( state => state.journal)

  const { body, title, date, onInputChange, formState } = useForm( note );

  const dateString = useMemo(() => dateFormatter(date), [date]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    
    if(messageSaved.length > 0){
      showAlertSuccErr({
          title: 'Nota actualizada',
          icon: 'success'
        })
    }
    
  }, [messageSaved])
  

  const onSaveNote = () => {
    dispatch( startSaveNote() );
  }

  const onFileInputChange = ({ target }) => {
    if(target.files === 0) return;

    dispatch( startUploadingFiles( target.files ) )
  }

  const onDelete = () => {
    dispatch( startDeletingNote() );
    showAlertSuccErr({
      title: 'Nota borrada correctamente',
      icon: 'success'
    })
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

        <input 
          type="file"
          multiple
          ref={ fileInputRef }
          onChange={ onFileInputChange }
          style={{ display: 'none' }}
        />

        <IconButton
          color="primary"
          disabled={ isSaving }
          onClick={ () => fileInputRef.current.click() }
        >
          <UploadFileOutlined />
        </IconButton>

        <Button 
          disabled={ isSaving }
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

      <Grid container justifyContent='end'>
        <Button
          onClick={ onDelete }
          sx={{ mt: 2 }}
          color="error"
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      <ImageGallery images={note.imageUrls} />

    </Grid>
  )
}