import { Alert, AlertTitle, Box, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { agent } from "../../app/api/agent";
import { useState } from "react";
import { NotFound } from "../../app/errors/NotFound";
import { Navigate } from "react-router-dom";

export default function AboutPage() {

  const [validationErrors, setValidationErrors] = useState<string[]>([])

  function getValidationError() {
    agent.TestErrors.getValidationError().
    catch(errors => setValidationErrors(errors))
    }
  return (
    <Container>
        <Box sx={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
      <Typography variant="h2" gutterBottom>
        Errors for Testing Purposes
      </Typography>
      <ButtonGroup>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))

          }
        >
          400 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))

          }
        >
          401 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>agent.TestErrors.get404Error().catch(error => {
            console.log(error);
            <Navigate replace to={'/not-found'}/>
          })}>
          404 Error
        </Button>
        <Button
          variant="contained"
          onClick={getValidationError}
        >
          Validation Error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))

          }
        >
          500 Error
        </Button>
      </ButtonGroup>
      </Box>
      { validationErrors.length >0 &&
      <Alert severity="error">
        <AlertTitle>Validation Errors</AlertTitle>
        <List>
          {validationErrors.map((error) => (
            <ListItem key={error}>
              <ListItemText>
                {error}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Alert>
}
    </Container>
  );
}
