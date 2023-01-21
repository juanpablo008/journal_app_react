import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views/';

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography >Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque blanditiis aut iste voluptatibus similique. Amet hic aut, animi quod architecto expedita debitis error doloremque illo, qui veritatis dolores at beatae.</Typography> */}
      <NothingSelectedView />
      {/* <NoteView /> */}
      <IconButton 
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>
    </JournalLayout>
  )
}
