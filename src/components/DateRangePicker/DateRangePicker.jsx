import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const DateRangePicker = ({ value, onChange }) => {
    const [start, setStart] = useState(value[0]);
    const [end, setEnd] = useState(value[1]);

    const handleStartChange = (event) => {
        const newStart = event.target.value;
        setStart(newStart);
        onChange([newStart, end]);
    };

    const handleEndChange = (event) => {
        const newEnd = event.target.value;
        setEnd(newEnd);
        onChange([start, newEnd]);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                label="Start Date"
                type="date"
                value={start}
                onChange={handleStartChange}
                InputLabelProps={{ shrink: true }}
                sx={{ marginRight: 2 }}
            />
            <Box>to</Box>
            <TextField
                label="End Date"
                type="date"
                value={end}
                onChange={handleEndChange}
                InputLabelProps={{ shrink: true }}
                sx={{ marginLeft: 2 }}
            />
        </Box>
    );
};

export default DateRangePicker;
