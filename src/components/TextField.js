import React from 'react';
import { TextField as MUITextField  } from '@mui/material';

export default function TextField({
    id,
    label,
    onChange,
    defaultValue,
    ...rest
}) {
    return (
        <MUITextField
            id={id}
            name={id}
            label={label}
            onChange={onChange}
            defaultValue={defaultValue}
            {...rest}
            variant="outlined"
            style={{
                marginRight: 8,
                marginBotton: 8,
              }}
        />
    );
}   