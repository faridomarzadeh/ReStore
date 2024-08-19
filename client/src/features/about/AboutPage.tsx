import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import { agent } from "../../app/api/agent";

export default function AboutPage() {
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
          onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))
          }
        >
          404 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.getValidationError().catch(error => console.log(error))

          }
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
    </Container>
  );
}
