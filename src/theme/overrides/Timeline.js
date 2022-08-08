// ----------------------------------------------------------------------

export default (theme) => ({
  MuiTimelineDot: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
      },
    },
  },

  MuiTimelineConnector: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.divider,
      },
    },
  },
});
