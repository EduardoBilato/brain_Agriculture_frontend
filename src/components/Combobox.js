import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function Combobox({
    id,
    label,
    options = [],
    onChange,
    value,
    ...rest
}) {
    return (
        <FormControl>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
                labelId={`${id}-label`}
                id={id}
                value={value}
                placeholder={label}
                onChange={onChange}
                {...rest}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    );
}   