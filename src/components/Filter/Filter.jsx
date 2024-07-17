import React from 'react'
import PropTypes from 'prop-types'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const Filter = ({ itemTypes, onFilterChange }) => {
    const handleTypeChange = (event, value) => {
        onFilterChange('type', value ? value.id : '')
    }

    return (
        <Box sx={{ width: 300, margin: '1rem 0' }}>
            <Autocomplete
                options={itemTypes}
                getOptionLabel={option => option.type}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={handleTypeChange}
                renderInput={params => (
                    <TextField {...params} label='Filter Items' variant='outlined' />
                )}
            />
        </Box>
    )
}

Filter.propTypes = {
    itemTypes: PropTypes.array.isRequired,
    onFilterChange: PropTypes.func.isRequired
}

export default Filter
