import { createTheme } from "@mui/material";

export const theme = (mode: any) => createTheme({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: "#fff",
                },
                divider: 'rgba(0, 0, 0, 0.12)',
                background: {
                    default: 'hsl(0, 0%, 98%)',
                    paper: 'hsl(0, 0%, 98%)',
                },
                text: {
                    primary: 'hsl(200, 15%, 8%)',
                    secondary: 'rgba(0, 0, 0, 0.6)',
                    disabled: 'rgba(0, 0, 0, 0.38)',
                },
                action: {
                    active: 'hsl(240deg 4.55% 91.37%)',
                    hover: 'hsl(0, 0%, 98%)',
                    selected: 'rgba(0, 0, 0, 0.08)',
                    disabled: 'rgba(0, 0, 0, 0.26)',
                    disabledBackground: 'rgba(0, 0, 0, 0.12)',
                },
            }
            : {
                // palette values for dark mode
                divider: 'rgba(255, 255, 255, 0.12)',
                background: {
                    default: 'hsl(207, 26%, 17%)',
                    paper: 'hsl(207, 26%, 17%)',
                },
                text: {
                    primary: 'hsl(0, 0%, 100%)',
                    secondary: 'rgba(255, 255, 255, 0.7)',
                    disabled: 'rgba(255, 255, 255, 0.5)',
                },
                action: {
                    active: 'rgba(255, 255, 255, 0.7)',
                    hover: 'hsl(235, 24%, 19%)',
                    selected: 'rgba(255, 255, 255, 0.16)',
                    disabled: 'rgba(255, 255, 255, 0.3)',
                    disabledBackground: 'rgba(255, 255, 255, 0.12)',
                },
            }),
    },
    typography: {
        fontFamily: 'Nunito Sans',
        fontWeightBold: 400,
        fontSize: 14
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    ...getTextFieldStyle(mode),
                    borderRadius: '0.5rem',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    display: 'none'
                },
                input: {
                    marginLeft: '0.9rem'
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    ...getTextFieldStyle(mode),
                    boxShadow: mode === 'dark' ? '0px 5px 10px  hsl(240, 21%, 7%)' : '0px 5px 10px hsl(236, 9%, 61%)',
                    borderRadius: '0.5rem'
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    ...getTextFieldStyle(mode),
                    borderRadius: '0.5rem',
                }
            }
        },
        MuiPopover: {
            styleOverrides: {

                paper: {
                    marginTop: '5px'
                }
            }
        }
    }
});

const getTextFieldStyle = (mode: string) => {
    if (mode === 'light') {
        return {
            background: 'hsl(0, 0%, 100%)',
            boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
        };
    }
    else {
        return {
            background: 'hsl(209, 23%, 22%)',
        };
    }
};