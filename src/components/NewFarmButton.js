import React from 'react';
import { Button } from '@mui/material';

export default function NewFarmButton({ onClick }) {
    return (
        <Button variant="contained" color='success' onClick={onClick} >Adicionar Fazenda</Button>
    );
}