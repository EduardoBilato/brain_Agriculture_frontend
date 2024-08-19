import React from 'react';
import { Autocomplete } from '@mui/material';
import TextField from './TextField';

export default function CultureField({
    id,
    options = [],
    defaultValue = [],
    ...rest
}) {
    return (
        <Autocomplete
            multiple
            fullWidth
            id={id}
            options={options}
            getOptionLabel={(option) => option.name}
            defaultValue={defaultValue}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Culturas"
                    width='100%'
                />
            )}
            {...rest}

        />
    )
}   
