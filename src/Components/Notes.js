import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export const card = ({idNote, title, content, isArchived, }) => (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
                Titulo Nota
            </Typography>
            <Typography variant="h6" component="div">
            </Typography>

            <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
        </CardContent>
        <CardActions>
            <ArchiveIcon/>
            <DeleteIcon/>
            <EditIcon/>
        </CardActions>
    </React.Fragment>
);

export const Notes = () => {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>,
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    )
}
