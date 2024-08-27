import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Basket } from "../../app/models/basket";
import { agent } from "../../app/api/agent";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Delete } from "@mui/icons-material";

export const BasketPage = () =>{

    const[loading,setLoading] = useState(true);

    const[basket,setBasket] = useState<Basket | null> (null);

    useEffect(()=>{
        agent.Basket.get()
        .then(data => setBasket(data))
        .catch(error => console.log(error))
        .finally(()=>setLoading(false))
    },[])

    if(loading)
        return <LoadingComponent message="loading basket..."/>

    if(basket == null)
        return <Typography variant="h3">Your basket is empty</Typography>

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
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
                  {item.name}
                </TableCell>
                <TableCell align="right">${(item.price/100).toFixed(2)}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">${((item.price/100) * item.quantity).toFixed(2)}</TableCell>
                <TableCell align="right">
                    <IconButton>
                        <Delete/>
                    </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}