import { Button, Container, Paper, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export const NotFound = () => {
    return(
        <Container component={Paper}>
            <Typography variant="h3" gutterBottom>Oops - we could not find what you were looking for</Typography>
            <Button component={Link} to={'/catalog'} fullWidth={true}>Go to Catalog</Button>
        </Container>
    )
}