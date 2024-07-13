import { createTheme, styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

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

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

export default customTheme;
export { QontoConnector };
