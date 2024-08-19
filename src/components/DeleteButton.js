import React from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

export default function DeleteButton({ onClick }) {
    return (
        <IconButton size="medium" color="error" onClick={onClick} >
            <Delete fontSize="inherit" />
        </IconButton>
    );
}

