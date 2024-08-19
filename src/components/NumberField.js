import React from 'react';
import { TextField as MUITextField } from '@mui/material';

export default function NumberField({
  id,
  label,
  onChange,
  defaultValue,
  startAdornment,
  ...rest
}) {
  return (
    <MUITextField
      id={id}
      label={label}
      onChange={onChange}
      defaultValue={defaultValue}
      startAdornment={startAdornment}
      type="number"
      {...rest}
      style={{
        marginRight: 8,
        marginBotton: 8,
      }}
    />
  );
}   