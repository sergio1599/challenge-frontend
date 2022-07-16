import { useState, useEffect } from 'react';
import React from 'react';
import { Grid, Button } from '@mui/material'
import { Container, spacing } from '@mui/system'

import { Notes } from './Notes'




export const Home = () => {

  const [notes, setNotes] = useState([])
  const [isChange, setIsChange] = useState(false)



  useEffect(() => {
    const getNotes = async () => {
      await fetch('https://notes-api-ensolvers.herokuapp.com/api/notes/')
        .then(response => response.json())
        .then(res => {
          const { success, data } = res;
          if (success) {
            setNotes(data);
            setIsChange(false);
          }
        });
    }
    getNotes();

  }, [isChange, setNotes])

  console.log(notes); 
  return (
    <>

      <Container >
        <Grid container spacing={0.5} m={0.5}>
          <Grid m={2}>
            <h1>My notes</h1>
          </Grid>
          <Grid m={2} >
            <Button variant="contained" mx="auto" p={1} >Create Notes</Button>
          </Grid>
          <Grid m={2}>
            <Button variant="contained">Archived Notes</Button>
          </Grid>
        </Grid>


        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={4} >
            <Notes />
          </Grid>
        </Grid>
      </Container>

    </>
  )
}
