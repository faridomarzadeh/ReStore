import { Backdrop, Box, CircularProgress, Container, Typography } from "@mui/material";

interface Props {
    message?: string;
}
export const LoadingComponent = ({message='Loading...'}:Props) =>{

    return (
        <Container>
            <Backdrop open invisible>
                <Box display='flex' justifyContent='center' alignItems='center' height='100vh' flexDirection='column'>
                <CircularProgress size={80} color="secondary" sx={{mb:5}}/>
                <Typography variant="h3">{message}</Typography>
                </Box>
            </Backdrop>
        </Container>
    )
}