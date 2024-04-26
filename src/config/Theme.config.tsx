import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
 
type ThemeProp = {
    children: JSX.Element
}
 
export enum themePalette {
    BG = "#040714",
    LIME = "#C8FA5F",
    FONT_GLOBAL = "'JetBrains Mono', monospace",
    BUTTON = "#6421ff"
}
 
const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: themePalette.BG
        },
        primary: {
            main: themePalette.LIME,
        },
        secondary: {
            main: themePalette.BUTTON,
        },
    },
    typography: {
        fontFamily: themePalette.FONT_GLOBAL,
    },
    components: {
        MuiButton: {
            defaultProps:{
                style:{
                    textTransform: "none",
                    boxShadow: "none",
                    borderRadius: "0.5em"
                }
            }
        },
        MuiAppBar: {
                        styleOverrides: {
                root: {
                    backgroundColor: themePalette.BG, // Cambia esto al color que quieras
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root:{
                    width: "15rem",
                    height: "25rem"
                }
            }
        }
    }
});
 
export const ThemeConfig: React.FC<ThemeProp> = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}