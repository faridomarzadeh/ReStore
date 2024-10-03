import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {incrementCounter, decrementCounter} from './CounterSlice'
export default function ContactPage() {

  const{ title, data } = useAppSelector(state=>state.counter);
  const dispatch = useAppDispatch();

  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="h6">The data is: {data}</Typography>
      <ButtonGroup sx={{ display: "flex", gap: "1rem" }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(decrementCounter(1))}
        >
          Decrement
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(incrementCounter(1))}
        >
          Increment
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(incrementCounter(5))}
        >
          Increment by 5
        </Button>
      </ButtonGroup>
    </>
  );
}
