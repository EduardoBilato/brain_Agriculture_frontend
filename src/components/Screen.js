import * as React from 'react';
import {
    Box,
    DialogTitle,
    DialogContent,
    Stack
} from '@mui/material';

export default function Screen({ title, children }) {
    return (
        <Box style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
            <DialogTitle>
                <h1>{title}</h1>
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={3} sx={{ width: 1024 }}>
                    {children}
                </Stack>
            </DialogContent>
        </Box >
    );
}
