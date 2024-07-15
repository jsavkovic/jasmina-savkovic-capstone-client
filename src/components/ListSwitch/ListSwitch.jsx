import * as React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const CustomSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#FFCAD4',
        '&:hover': {
            backgroundColor: 'rgba(0, 51, 102, 0.08)',
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#FFCAD4',
    },
}));

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
        color: '#003366',
    },
}));

const ListSwitch = ({ isChecked, onSwitchChange }) => {
    const handleChange = (event) => {
        onSwitchChange(event.target.checked);
    };

    return (
        <FormGroup>
            <Box display="flex" alignItems="center">
                <Typography variant="body1" color="#003366">Archive</Typography>
                <CustomFormControlLabel
                    control={<CustomSwitch checked={isChecked} onChange={handleChange} />}
                    label={<Typography variant="body1" color="#003366">List</Typography>}
                />
            </Box>
        </FormGroup>
    );
};

ListSwitch.propTypes = {
    isChecked: PropTypes.bool.isRequired,
    onSwitchChange: PropTypes.func.isRequired,
};

export default ListSwitch;
