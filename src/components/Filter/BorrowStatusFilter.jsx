import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const steps = ['Requested', 'Accepted', 'Borrowed', 'Declined', 'Returned'];

const BorrowStatusFilter = ({ onFilterChange }) => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleStep = (step) => () => {
        setActiveStep(step);
        onFilterChange('status', step + 1);
    };

    return (
        <Box sx={{ width: '90%', margin: '2rem' }}>
            <StyledStepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            <StepLabel StepIconComponent={(props) => <CustomStepIcon {...props} />}>
                                {label}
                            </StepLabel>
                        </StepButton>
                    </Step>
                ))}
            </StyledStepper>
        </Box>
    );
};

BorrowStatusFilter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default BorrowStatusFilter;

const StyledStepper = styled(Stepper)(({ theme }) => ({
    '& .MuiStepLabel-label': {
        color: '#003366', // dark blue font
        '&.Mui-active': {
            color: '#003366', // dark blue font
        },
        '&.Mui-completed': {
            color: '#003366', // dark blue font
        },
    },
}));

const CustomStepIcon = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: '#FFC0CB', // pink circles
    zIndex: 1,
    color: '#003366', // dark blue font
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    '&.Mui-active': {
        backgroundColor: '#FFC0CB', // pink circles
    },
    '&.Mui-completed': {
        backgroundColor: '#FFC0CB', // pink circles
    },
}));
