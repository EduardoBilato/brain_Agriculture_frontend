import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function LinkButton({url, label, variant, color}) {
    return (
        <Button variant={variant} color={color} component={Link} to={url} >{label}</Button>
    );
}   