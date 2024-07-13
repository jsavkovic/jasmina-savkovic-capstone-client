import { createTheme } from '@mui/material/styles';

const customTheme = (outerTheme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiAutocomplete: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#fff',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                    },
                    inputRoot: {
                        '&[class*="MuiOutlinedInput-root"]': {
                            padding: '0.5rem',
                        },
                    },
                    option: {
                        padding: '8px',
                        '&:hover': {
                            backgroundColor: '#f7f7f7',
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& label.Mui-focused': {
                            color: '#003366',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: '#003366',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#003366',
                            },
                            '&:hover fieldset': {
                                borderColor: '#003366',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#003366',
                            },
                        },
                    },
                },
            },
        },
    });

export default customTheme;
