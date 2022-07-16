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
import Swal from 'sweetalert2'



export const Notes = ({ idNote, title, content, isArchived, setIsRefresh }) => {


    const handleArchive = async (idNote) => {
        const response = await fetch(`https://notes-api-ensolvers.herokuapp.com/api/notes/change-archived/${idNote}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const { success, message } = data;
        if (success) {
            Swal.fire(
                'Archived',
                'The note was filed successfully',
                'success'
            )
            setIsRefresh(true);
        }
    };


    const handleDelete = async (idNote) => {
        Swal.fire({
            title: 'Are you sure to delete this Note?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch(`https://notes-api-ensolvers.herokuapp.com/api/notes/delete-note/${idNote}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        Swal.fire(
                            'Deleted!',
                            'The note was deleted successfully',
                            'success'
                        )
                        setIsRefresh(true);
                    })
            }
        })
    };





    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined" >
                <React.Fragment>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h6" component="div">
                        </Typography>

                        <Typography variant="body2">
                            {content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" >
                            <DeleteIcon onClick={() => handleDelete(idNote)} />
                        </Button>
                        {
                            isArchived
                                ?
                                <Button size="small" onClick={() => handleArchive(idNote)}>
                                    <ArchiveIcon />
                                </Button>
                                :
                                <Button size="small" onClick={() => handleArchive(idNote)} disabled>
                                    <ArchiveIcon />
                                </Button>
                        }
                        <Button size="small" >
                            <EditIcon />
                        </Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    )
}
