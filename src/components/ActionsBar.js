
import React from 'react';
import { DialogActions } from '@mui/material';

export default function ActionsBar({ children }) {
    return (
        <DialogActions>
            {children}
        </DialogActions>
    );
}   