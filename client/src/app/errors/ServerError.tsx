import {Container, Divider, Paper, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"

export const ServerError = () => {
    const {state} = useLocation();
    console.log(state.error);
    return (
        <Container component={Paper}>
            {state?.error?
            <>
            <Typography gutterBottom variant="h3">{state.error.title}</Typography>
            <Divider/>
            <Typography variant="body1">
                {state.error.detail || "Internal Server Error"}
            </Typography>
            </>
             :
        <Typography variant="h5">Server Error</Typography>
            }
        </Container>
    )
}