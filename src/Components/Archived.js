import React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material'
import { Container, spacing } from '@mui/system'
import { Notes } from './Notes'
import { ModalCreateNote } from './ModalCreateNote'
import { useNavigate } from 'react-router-dom'




export const Archived = () => {

    const [notes, setNotes] = useState([]);
    const [isArchive, setIsArchive] = useState(false);
    const [open, setOpen] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen(true);
    }

    const navigateUnArchive = () => navigate('/');


    useEffect(() => {
        const getNotes = async () => {
            await fetch(`https://notes-api-ensolvers.herokuapp.com/api/notes/data/archived`)
                .then(response => response.json())
                .then(res => {
                    const { success, data } = res;
                    if (success) {
                        setIsRefresh(false);
                        setNotes(data);
                        setIsArchive(false);
                    }
                });
        }
        getNotes();

    }, [setIsArchive, setNotes, isRefresh])

    return (
        <>
            <Container >
                <Grid container spacing={0.5} m={0.5}>
                    <Grid m={2}>
                        <h1>Archived notes</h1>
                    </Grid>
                    <Grid mt={5} mr={2} >
                        <Button onClick={handleOpen} variant="contained" mx="auto" p={1} >Create Notes</Button>
                        <ModalCreateNote open={open} setOpen={setOpen} setIsRefresh={setIsRefresh} />
                    </Grid>
                    <Grid mt={5}>
                        <Button variant="contained" onClick={navigateUnArchive}>Unarchived Notes</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        notes.map(note => (
                            <Grid item xs={2} sm={4} md={4} >
                                <Notes key={note.idNote} {...note} setIsRefresh={setIsRefresh} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </>
    )
}
