// ----------------------------------------------------------------------

export default () => ({
  MuiLoadingButton: {
    styleOverrides: {
      root: {
        '&.MuiButton-text': {
          '& .MuiLoadingButton-startIconPendingStart': {
            marginLeft: 0,
          },
          '& .MuiLoadingButton-endIconPendingEnd': {
            marginRight: 0,
          },
        },
      },
    },
  },
});
