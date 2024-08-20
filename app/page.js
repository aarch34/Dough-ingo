'use client'
import {Container, Typography, AppBar, Toolbar, Button, Box, Grid} from '@mui/material'
import groq from "groq";
import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';

const systemPrompt = ` 
You are doughlingo, an AI powered flashcard generator to help people learn new languages through flashcards. Having english, spanish, french, hindi as the languages offered you will help people go form basic to communication level through different categories of flashcards.`

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text&display=swap');
  
  body {
    font-family: 'DM Serif Text', serif;
  }
`;

const StyledContainer = styled(Container)`
background-color: #ffe0b2;
min-height: 100vh;
`
const StyledButton = styled(Button)`
  && {
    background-color: black;
    color: white;
    font-family: 'DM Serif Text', serif;
    &:hover {
      background-color: #333;
    }
  }
`;

const StyledTypography = styled(Typography)`
  && {
    font-family: 'DM Serif Text', serif;
  }
`;

export async function POST(req) {
  const groq = groq()
  const data = await req.text()

  const completion = await groq.chat.completion.create({
    messages: [
      {role: 'system', content: systemPrompt},
      {role: 'user', content: data},
    ],
    model: 'text-davinci-003',
    response_format: {type: 'json_object'},
  })
  const flashcards = JSON.parse(completion.choices[0].message.content)
  return NextResponse.json(flashcards.flashcard)
}

function Home() {
    return (
      <>
      <GlobalStyle />
      <StyledContainer maxWidth="100vw">
        <header>
          <title>Flashcard Generator</title>
          <meta name="description" content="Learn new languages through flashcards" />
        </header>
        
        <AppBar position="static" color=''>
          <Toolbar>
            <StyledTypography variant="h6" style={{flexGrow: 1}}>
              DoughLingo
            </StyledTypography>
          </Toolbar>
        </AppBar>
  
        <Box sx={{ textAlign:'center', my:4 }}>
          <StyledTypography variant="h2" gutterBottom>
            Welcome to DoughLingo
          </StyledTypography>
          <StyledTypography variant="h5" gutterBottom>
            A fun way to learn a language
          </StyledTypography>
          <StyledButton variant="contained" color="inherit" sx={{mt: 2, backgroundColor:'black', color:'white', '&:hover':{backgroundColor: '#333'}}}>
            Get Started
          </StyledButton>
        </Box>
  
        <Box sx={{my: 6}}>
          <StyledTypography variant="h4" gutterBottom>Features</StyledTypography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <StyledTypography variant="h6" gutterBottom>Text-to-audio</StyledTypography>
              <StyledTypography gutterBottom>
                Our system uses text-to-audio to help you better understand the words and phrases.
              </StyledTypography>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledTypography variant="h6" gutterBottom>Translation</StyledTypography>
              <StyledTypography gutterBottom>
                Our system uses translation to help you better understand in the language you know for better learning.
              </StyledTypography>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledTypography variant="h6" gutterBottom>Progress</StyledTypography>
              <StyledTypography gutterBottom>
                Your progress will be saved on your user account as you sign up for the platform.
              </StyledTypography>
            </Grid>
          </Grid>
        </Box>
  
        <Box sx={{my: 6, textAlign:'center'}}>
          <StyledTypography variant="h4" gutterBottom>Pricing</StyledTypography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: '1px solid',
                borderColor:'black',
                borderRadius: 2,
              }}>
                <StyledTypography variant="h5" gutterBottom>Basic</StyledTypography>
                <StyledTypography variant="h6" gutterBottom>Free plan</StyledTypography>
                <StyledTypography>
                  Access to learn languages with basic features such as beginner lessons.
                </StyledTypography>
                <StyledButton variant="contained">I'll take this!</StyledButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: '1px solid',
                borderColor:'black',
                borderRadius: 2,
              }}>
                <StyledTypography variant="h5" gutterBottom>Pro</StyledTypography>
                <StyledTypography variant="h6" gutterBottom>₹15/month</StyledTypography>
                <StyledTypography>
                  Access to learn languages with additional features such as conversational phrases.
                </StyledTypography>
                <StyledButton variant="contained" >I'll take this!</StyledButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </StyledContainer> 
      </>
    );
}

export default Home
  </Container> 
  )
}
