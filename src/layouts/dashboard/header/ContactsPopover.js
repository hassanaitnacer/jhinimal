import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Avatar, Typography, ListItemText, ListItemAvatar, MenuItem } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import BadgeStatus from '../../../components/BadgeStatus';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

export default () => {
  const [open, setOpen] = useState(null);

  const contacts = [
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
      name: 'Jayvion Simon',
      username: 'Jayvion Simon',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_1.jpg',
      address: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
      phone: '365-374-4961',
      email: 'nannie_abernathy70@yahoo.com',
      lastActivity: '2022-07-26T13:55:03.785Z',
      status: 'busy',
      position: 'UX Designer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
      name: 'Lucian Obrien',
      username: 'Lucian Obrien',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg',
      address: '1147 Rohan Drive Suite 819 - Burlington, VT / 82021',
      phone: '904-966-2836',
      email: 'ashlynn_ohara62@gmail.com',
      lastActivity: '2022-07-25T12:55:03.785Z',
      status: 'online',
      position: 'Full Stack Designer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
      name: 'Deja Brady',
      username: 'Deja Brady',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_3.jpg',
      address: '18605 Thompson Circle Apt. 086 - Idaho Falls, WV / 50337',
      phone: '399-757-9909',
      email: 'milo.farrell@hotmail.com',
      lastActivity: '2022-07-24T11:55:03.785Z',
      status: 'busy',
      position: 'Backend Developer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
      name: 'Harrison Stein',
      username: 'Harrison Stein',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_4.jpg',
      address: '110 Lamar Station Apt. 730 - Hagerstown, OK / 49808',
      phone: '692-767-2903',
      email: 'violet.ratke86@yahoo.com',
      lastActivity: '2022-07-23T10:55:03.786Z',
      status: 'online',
      position: 'UX Designer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
      name: 'Reece Chung',
      username: 'Reece Chung',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg',
      address: '36901 Elmer Spurs Apt. 762 - Miramar, DE / 92836',
      phone: '990-588-5716',
      email: 'letha_lubowitz24@yahoo.com',
      lastActivity: '2022-07-22T09:55:03.786Z',
      status: 'away',
      position: 'UX Designer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
      name: 'Lainey Davidson',
      username: 'Lainey Davidson',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_6.jpg',
      address: '2089 Runolfsson Harbors Suite 886 - Chapel Hill, TX / 32827',
      phone: '955-439-2578',
      email: 'aditya_greenfelder31@gmail.com',
      lastActivity: '2022-07-21T08:55:03.786Z',
      status: 'busy',
      position: 'Project Manager',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
      name: 'Cristopher Cardenas',
      username: 'Cristopher Cardenas',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_7.jpg',
      address: '279 Karolann Ports Apt. 774 - Prescott Valley, WV / 53905',
      phone: '226-924-4058',
      email: 'lenna_bergnaum27@hotmail.com',
      lastActivity: '2022-07-20T07:55:03.786Z',
      status: 'offline',
      position: 'Leader',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
      name: 'Melanie Noble',
      username: 'Melanie Noble',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_8.jpg',
      address: '96607 Claire Square Suite 591 - St. Louis Park, HI / 40802',
      phone: '552-917-1454',
      email: 'luella.ryan33@gmail.com',
      lastActivity: '2022-07-19T06:55:03.786Z',
      status: 'away',
      position: 'Backend Developer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
      name: 'Chase Day',
      username: 'Chase Day',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_9.jpg',
      address: '9388 Auer Station Suite 573 - Honolulu, AK / 98024',
      phone: '285-840-9338',
      email: 'joana.simonis84@gmail.com',
      lastActivity: '2022-07-18T05:55:03.786Z',
      status: 'online',
      position: 'Project Manager',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
      name: 'Shawn Manning',
      username: 'Shawn Manning',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_10.jpg',
      address: '47665 Adaline Squares Suite 510 - Blacksburg, NE / 53515',
      phone: '306-269-2446',
      email: 'marjolaine_white94@gmail.com',
      lastActivity: '2022-07-17T04:55:03.786Z',
      status: 'away',
      position: 'UI Designer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b11',
      name: 'Soren Durham',
      username: 'Soren Durham',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_11.jpg',
      address: '989 Vernice Flats Apt. 183 - Billings, NV / 04147',
      phone: '883-373-6253',
      email: 'vergie_block82@hotmail.com',
      lastActivity: '2022-07-16T03:55:03.786Z',
      status: 'offline',
      position: 'UI/UX Designer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12',
      name: 'Cortez Herring',
      username: 'Cortez Herring',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_12.jpg',
      address: '91020 Wehner Locks Apt. 673 - Albany, WY / 68763',
      phone: '476-509-8866',
      email: 'vito.hudson@hotmail.com',
      lastActivity: '2022-07-15T02:55:03.786Z',
      status: 'offline',
      position: 'UI/UX Designer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b13',
      name: 'Brycen Jimenez',
      username: 'Brycen Jimenez',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_13.jpg',
      address: '585 Candelario Pass Suite 090 - Columbus, LA / 25376',
      phone: '201-465-1954',
      email: 'tyrel_greenholt@gmail.com',
      lastActivity: '2022-07-14T01:55:03.786Z',
      status: 'busy',
      position: 'UI Designer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b14',
      name: 'Giana Brandt',
      username: 'Giana Brandt',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_14.jpg',
      address: '80988 Renner Crest Apt. 000 - Fargo, VA / 24266',
      phone: '538-295-9408',
      email: 'dwight.block85@yahoo.com',
      lastActivity: '2022-07-13T00:55:03.786Z',
      status: 'away',
      position: 'Backend Developer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b15',
      name: 'Aspen Schmitt',
      username: 'Aspen Schmitt',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_15.jpg',
      address: '28307 Shayne Pike Suite 523 - North Las Vegas, AZ / 28550',
      phone: '531-492-6028',
      email: 'mireya13@hotmail.com',
      lastActivity: '2022-07-11T23:55:03.786Z',
      status: 'offline',
      position: 'Backend Developer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b16',
      name: 'Colten Aguilar',
      username: 'Colten Aguilar',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_16.jpg',
      address: '205 Farrell Highway Suite 333 - Rock Hill, OK / 63421',
      phone: '981-699-7588',
      email: 'dasia_jenkins@hotmail.com',
      lastActivity: '2022-07-10T22:55:03.786Z',
      status: 'offline',
      position: 'Front End Developer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
      name: 'Angelique Morse',
      username: 'Angelique Morse',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_17.jpg',
      address: '253 Kara Motorway Suite 821 - Manchester, SD / 09331',
      phone: '500-268-4826',
      email: 'benny89@yahoo.com',
      lastActivity: '2022-07-09T21:55:03.786Z',
      status: 'away',
      position: 'Backend Developer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b18',
      name: 'Selina Boyer',
      username: 'Selina Boyer',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_18.jpg',
      address: '13663 Kiara Oval Suite 606 - Missoula, AR / 44478',
      phone: '205-952-3828',
      email: 'dawn.goyette@gmail.com',
      lastActivity: '2022-07-08T20:55:03.786Z',
      status: 'away',
      position: 'Full Stack Designer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b19',
      name: 'Lawson Bass',
      username: 'Lawson Bass',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_19.jpg',
      address: '8110 Claire Port Apt. 703 - Anchorage, TN / 01753',
      phone: '222-255-5190',
      email: 'zella_hickle4@yahoo.com',
      lastActivity: '2022-07-07T19:55:03.786Z',
      status: 'busy',
      position: 'Full Stack Developer',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b20',
      name: 'Ariana Lang',
      username: 'Ariana Lang',
      avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_20.jpg',
      address: '4642 Demetris Lane Suite 407 - Edmond, AZ / 60888',
      phone: '408-439-8033',
      email: 'avery43@hotmail.com',
      lastActivity: '2022-07-06T18:55:03.786Z',
      status: 'busy',
      position: 'Backend Developer',
    },
  ];

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Iconify icon={'eva:people-fill'} width={20} height={20} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 320,
          '& .MuiMenuItem-root': {
            px: 1.5,
            height: ITEM_HEIGHT,
            borderRadius: 0.75,
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 1.5 }}>
          Contacts <Typography component="span">({contacts.length})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
          {contacts.map((contact) => (
            <MenuItem key={contact.id}>
              <ListItemAvatar sx={{ position: 'relative' }}>
                <Avatar src={contact.avatar} />
                <BadgeStatus status={contact.status} sx={{ position: 'absolute', right: 1, bottom: 1 }} />
              </ListItemAvatar>

              <ListItemText
                primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                secondaryTypographyProps={{ typography: 'caption' }}
                primary={contact.name}
                secondary={contact.status === 'offline' && fToNow(contact.lastActivity)}
              />
            </MenuItem>
          ))}
        </Scrollbar>
      </MenuPopover>
    </>
  );
};
