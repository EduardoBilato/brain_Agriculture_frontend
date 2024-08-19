import React from 'react';
import { Button } from '@mui/material';

export default function SaveButton({ ...rest }) {
    return (
        <Button variant="contained" color='success' {...rest} >Salvar</Button>
    );
}   