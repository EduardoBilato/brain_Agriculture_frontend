import React from 'react';
import { IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

export default function EditButton({ onClick }) {
    return (
        <IconButton size="medium" color="success" onClick={onClick} >
            <Edit fontSize="inherit" />
        </IconButton>
    );
}

