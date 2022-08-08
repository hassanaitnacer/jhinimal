// ----------------------------------------------------------------------

export default (theme) => ({
  MuiPopover: {
    styleOverrides: {
      paper: {
        boxShadow: theme.customShadows.dropdown,
        borderRadius: Number(theme.shape.borderRadius) * 1.5,
      },
    },
  },
});
