import React from 'react'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Grid, Button } from '@mui/material'
import { useForm } from '../hooks/useForm';
import swal from 'sweetalert';


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

export const ModalCreateNote = ({ open, setOpen }) => {


    const handleClose = () => setOpen(false);

    const [formNoteValues, handleNoteInputChange] = useForm({
        title: '',
        content: '',
    })


    const handleSubmit = async (e) => {

        const title = formNoteValues.title;
        const content = formNoteValues.content;

        e.preventDefault();

        if (title === '' || content === '') {
            swal({
                title: "Ingrese todos los datos!",
                text: "Ingrese los datos!",
                icon: "error"
            })
        } else {
            console.log('si entra')
             fetch(`https://notes-api-ensolvers.herokuapp.com/api/notes/create-note`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    content
                
            })
         }); 

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
                        Crear Nota
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
                            fullWidth
                            id="outlined-multiline-static"
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
                            <Button variant="contained">Cancel</Button>
                        </Grid>
                        <Grid>
                            <Button onClick={handleSubmit} variant="contained">Save</Button>
                        </Grid>

                    </Grid>
                </Box>
            </Modal>
        </>
    )
}
