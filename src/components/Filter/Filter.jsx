import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import customTheme from '../../theme';

const Filter = ({ itemTypes = [], borrowStatuses = [], onFilterChange }) => {
    const outerTheme = useTheme();

    return (
        <ThemeProvider theme={customTheme(outerTheme)}>
            <Box sx={{ width: 300 }}>
                <Autocomplete
                    options={itemTypes}
                    getOptionLabel={(option) => option.type}
                    onChange={(event, value) => onFilterChange(value ? value.id : '')}
                    renderInput={(params) => (
                        <TextField {...params} label="Filter Items" variant="outlined" />
                    )}
                />
            </Box>
        </ThemeProvider>
    );
};

export default Filter;