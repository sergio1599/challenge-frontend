import React from 'react'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Grid, Button } from '@mui/material'
import { useForm } from '../hooks/useForm';
import Swal from 'sweetalert2'



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export const ModalEditNote = ({ open, setOpen, setIsRefresh, note}) => {

    const handleClose = () => setOpen(false);

    const [formNoteValues, handleNoteInputChange] = useForm({
        title: note.title,
        content: note.content
    })


    const handleUpdate = async (e) => {

        const title = formNoteValues.title;
        const content = formNoteValues.content;

        e.preventDefault();
        if (title === '' || content === '') {

        } else {
            fetch(`https://notes-api-ensolvers.herokuapp.com/api/notes/update-note/${note.idNote}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    content
                })
            });
            Swal.fire({
                title: "Muy bien!",
                text: `la nota ${title} se ha agregado`,
                icon: "success"
            })
            setIsRefresh(true)
            handleClose()
        }


    }


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        mb={1}
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Editar nota
                    </Typography>
                    <Grid mb={2}>
                        <TextField
                            fullWidth id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            name={'title'}
                            value={formNoteValues.title}
                            onChange={handleNoteInputChange}
                        />
                    </Grid>
                    <Grid mb={2}>
                        <TextField
                            fullWidth id="outlined-multiline-static"
                            label="Content"
                            multiline
                            rows={4}
                            name={'content'}
                            value={formNoteValues.content}
                            onChange={handleNoteInputChange}
                        />
                    </Grid>
                    <Grid container>
                        <Grid mr={2}>
                            <Button variant="contained" onClick={handleClose}>Cancel</Button>
                        </Grid>
                        <Grid>
                            {
                               formNoteValues.title || formNoteValues.content 
                               ? <Button onClick={handleUpdate} variant="contained" >Save</Button>
                               : <Button onClick={handleUpdate} variant="contained" disabled>Save</Button>
                            }
                        </Grid>

                    </Grid>
                </Box>
            </Modal>
        </>
    )
}
