import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/Product";
import { Link } from "react-router-dom";
import { useState } from "react";
import { agent } from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { formatCurrency } from "../../app/utils/util";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";

interface Props {
    product: Product
}
export default function ProductCard({product}:Props) {

  const[loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddItem = (productId: number) =>{
    setLoading(true);

    agent.Basket.addItem(productId)
    .then(basket => dispatch(setBasket(basket)))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))
  }
    return (
        <Card >
            <CardHeader
            avatar ={
                <Avatar sx={{bgcolor: 'secondary.light'}}>
                  {product.name.charAt(0).toUpperCase()}
                </Avatar>                
            }
            title = {
                product.name
            }
            titleTypographyProps={{
                sx: {
                    fontWeight: 'bold',
                    color: 'primary.main'
                }
            }}
            />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color={"secondary"} variant="h5">
          {formatCurrency(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={loading} onClick={()=>handleAddItem(product.id)} size="small">Add to Card</LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
      </CardActions>
    </Card>
    )
}