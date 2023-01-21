import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views/';

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography >Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque blanditiis aut iste voluptatibus similique. Amet hic aut, animi quod architecto expedita debitis error doloremque illo, qui veritatis dolores at beatae.</Typography> */}
      {/* <NothingSelectedView /> */}
      <NoteView />
    </JournalLayout>
  )
}
