import React from 'react';
import { Button } from '@mui/material';

export default function CloseButton({ href }) {
    function handleClose() {
        window.location.href = href;
    }

    return (
        <Button variant="outlined" color='warning' onClick={handleClose} >Voltar</Button>
    );
}   