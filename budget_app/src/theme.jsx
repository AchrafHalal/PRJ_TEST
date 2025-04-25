export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#607d8b",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#fbc02d",
          },
          background: {
            default: "#f5f7f9",
            paper: "#ffffff",
          },
          admin: '#388e3c',
           
          
        }
      : {
          primary: {
            main: "#607d8b",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#fbc02d",
          },
          background: {
            default: "#1f2a32",     
            paper: "#27343d",       
          },
          admin: '#1b5e20'

        }),
  },
});
