import { TurnedInNot } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({note}) => {

  const { title, body } = note;

  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0, 17) + '...'
      : title;
  }, [title]);

  const onClickListItemButton = () => {
    dispatch( setActiveNote(note) );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickListItemButton}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}

SideBarItem.propTypes = {
  note: PropTypes.object.isRequired
}
