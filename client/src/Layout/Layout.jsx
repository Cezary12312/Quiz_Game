import React from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { Container } from '@mui/system'
import useStateContext from '../Hooks/useStateContext'


export default function Layout(){

    const {resetContext} = useStateContext()

    const navigate = useNavigate()

    const logout = () => {
        resetContext()
        navigate("/")
    }

    return(
        <>
            <AppBar position="sticky">
                <Toolbar sx={{ width: 640, m: 'auto'}}>
                    <Typography variant="h4" align="center">
                        Quiz
                    </Typography>
                    <Button onClick={logout}>Wyloguj się</Button>
                    <Button></Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </>
    )
}