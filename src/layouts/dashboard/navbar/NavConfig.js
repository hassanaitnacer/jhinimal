import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';

// routes
import { PATH_ADMIN } from '../../../routes/paths';

// ----------------------------------------------------------------------

const sidebarConfig = [
  // ADMINISTRATION
  // ----------------------------------------------------------------------
  {
    subheader: 'labels.administration_one',
    items: [{ title: 'labels.user_other', path: PATH_ADMIN.user.root, icon: <PeopleAltTwoToneIcon /> }],
  },
];

export default sidebarConfig;
