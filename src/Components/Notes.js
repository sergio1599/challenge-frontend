import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import { ModalEditNote } from './ModalEditNote';



export const Notes = ({ idNote, title, content, isArchived, setIsRefresh}) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      }

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

    const handleUnArchive = async (idNote) => {
        const response = await fetch(`https://notes-api-ensolvers.herokuapp.com/api/notes/change-unarchived/${idNote}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const { success, message } = data;
        if (success) {
            Swal.fire(
                'Unarchived',
                'The note was successfully unarchived',
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
                        <Typography sx={{ fontSize: 32 }} color="text.primary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h6" component="div">
                        </Typography>

                        <Typography variant="body2">
                            {content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="error">
                            <DeleteIcon onClick={() => handleDelete(idNote)} />
                        </Button>
                        {
                            isArchived
                                ?
                                <Button size="small" onClick={() => handleUnArchive(idNote)} >
                                    <UnarchiveIcon />
                                </Button>
                                :
                                <Button size="small" onClick={() => handleArchive(idNote)} >
                                    <ArchiveIcon />
                                </Button>
                        }
                        <Button onClick={handleOpen} size="small" color="success">
                            <EditIcon />
                            <ModalEditNote  open={open} setOpen={setOpen} setIsRefresh={setIsRefresh} note={{idNote, title, content}} />
                        </Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    )
}
