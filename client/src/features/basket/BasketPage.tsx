import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { agent } from "../../app/api/agent";

export const BasketPage = () =>{
  const[loading, setLoading] = useState(false);
  const{basket, setBasket, removeItem} = useStoreContext();

  function handleAddItem(productId: number)
  {
    setLoading(true);
    agent.Basket.addItem(productId)
    .then(basket => setBasket(basket))
    .catch(error => console.log(error))
    .finally(()=>setLoading(false))
  }

  function handleRemoveItem(productId: number, quantity=1)
  {
    setLoading(true);
    agent.Basket.removeItem(productId, quantity)
    .then(()=>removeItem(productId,quantity))
    .catch(error => console.log(error))
    .finally(()=>setLoading(false))
  }

    if(basket == null)
        return <Typography variant="h3">Your basket is empty</Typography>

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display={"flex"} alignContent={"center"} alignItems={"center"}>
                    <img src={item.pictureUrl} alt={item.name} style={{height:50, marginRight:20}}/>
                    {item.name}
                  </Box>
                </TableCell>
                <TableCell align="right">${(item.price/100).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <LoadingButton color="error" loading={loading} onClick={()=>handleRemoveItem(item.productId)}>
                    <Remove/>
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton color="secondary" loading={loading} onClick={()=>handleAddItem(item.productId)}>
                    <Add/>
                  </LoadingButton>
                  </TableCell>
                <TableCell align="right">${((item.price/100) * item.quantity).toFixed(2)}</TableCell>
                <TableCell align="right">
                    <LoadingButton loading={loading} onClick={()=>handleRemoveItem(item.productId,item.quantity)}>
                        <Delete/>
                    </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}