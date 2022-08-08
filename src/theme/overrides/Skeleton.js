// ----------------------------------------------------------------------

export default (theme) => ({
  MuiSkeleton: {
    defaultProps: {
      animation: 'wave',
    },

    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.neutral,
      },
    },
  },
});
