import * as React from 'react';
import {
    Box,
    List as MuiList,
    ListItemButton,
    ListItemText,
    Typography,
    Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';

function renderRow({ id, cpfCnpj, name }) {
    return (
        <React.Fragment key={id}>
            <ListItemButton component={Link} to={`/edit/${id}`}>
                <ListItemText
                    primary={
                        <Typography variant="h6" >
                            {name} - {cpfCnpj}
                        </Typography>
                    }
                />
            </ListItemButton>
            <Divider />
        </React.Fragment>
    );
}

export default function List({ list = [] }) {
    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
                overflow: 'auto',
                maxHeight: 400,
            }}
        >
            <MuiList >
                {list.map(renderRow)}
            </MuiList>
        </Box>
    );
}
