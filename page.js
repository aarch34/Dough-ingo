import { NextResponse } from "next/server";
import {Container, Typography, AppBar, Toolbar, Button, Box, Grid} from '@mui/material'
import groq from "groq";
import Head from 'next/head';

const systemPrompt = ` 
You are doughlingo, an AI powered flashcard generator to help people learn new languages through flashcards. Having english, spanish, french, hindi as the languages offered you will help people go form basic to communication level through different categories of flashcards.`

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

export default function Home(){
  return (
    <Container maxWidth="100vw">
    <head>
      <Head>
       <title>Flashcard Generator</title>
      <meta name="description" content="Learn new languages through flashcards" /> 
      </Head>
    </head>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{flexGrow: 1}}>
          DoughLingo
        </Typography>
      </Toolbar>
    </AppBar>

    <Box
    sx={{
      textAlign:'center',
      my:4,
    }}
    >
      <Typography variant="h2" gutterBottom> Welcome to DoughLingo, where you can learn new languages through flashcards.</Typography>
      <Typography variant="h5" gutterBottom>
        {' '}
        A fun way to learn a language
      </Typography>
      <Button variant="contained" color="black" sx={{mt: 2}}>Get Started</Button>
    </Box>
    <Box
    sx={{my: 6}}>
      <Typography variant="h4" gutterBottom>Features</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Text-to-audio</Typography>
          <Typography gutterBottom>
            {' '}
            Our system uses text-to-audio to help you better understand the words and phrases.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Translation</Typography>
          <Typography gutterBottom>
            {' '}
            Our system uses translation to help you better understand in the language you know for better learning.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Progress</Typography>
          <Typography gutterBottom>
            {' '}
            Your progress will be saved on your user account as you sign up for the platform.
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Box sx={{my: 6, textAlign:'center'}}>
      <Typography variant="h4" gutterBottom>Pricing</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{
            p: 3,
            border: '1px solid',
            borderColor:'black',
            borderRadius: 2,
          }}>
          <Typography variant="h5" gutterBottom >Basic</Typography>
          <Typography variant="h6" gutterBottom >Free plan</Typography>
          <Typography>
            {' '}
            Access to learn languages with basic features such as beginner lessons.
          </Typography>
          <Button variant="contained" color="beige" sx={{mt: 2}}>I'll take this!</Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{
            p: 3,
            border: '1px solid',
            borderColor:'black',
            borderRadius: 2,
          }}>
          <Typography variant="h5" gutterBottom >Pro</Typography>
          <Typography variant="h6" gutterBottom >₹15/month</Typography>
          <Typography>
            {' '}
            Access to learn languages with additional features such as conversational phrases.
          </Typography>
          <Button variant="contained" color="beige" sx={{mt: 2}}>I'll take this!</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Container> 
  )
}
