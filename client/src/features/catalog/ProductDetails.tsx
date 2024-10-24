import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/Product";
import { agent } from "../../app/api/agent";
import { NotFound } from "../../app/errors/NotFound";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "../basket/basketSlice";

export default function ProductDetails() {
  const {basket} = useAppSelector(state=>state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const[quantity, setQuantity] = useState(0);
  const[submitting, setSubmitting] = useState(false);
  const item = basket?.items.find(i=>i.productId==product?.id)

  useEffect(() => {
    if(item)
      setQuantity(item.quantity);
    if (id) {
      agent.Catalog.details(parseInt(id))
        .then((response) => setProduct(response))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [id, item]);

  function handleChange(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>)
  {
    if(parseInt(event.currentTarget.value)>= 0)
    {
      setQuantity(parseInt(event.currentTarget.value));
    }
  }

  function handleUpdate()
  {
    if(!product)
      return;
    setSubmitting(true);
    if(!item || quantity > item.quantity)
    {
      const updatedQuantity = item? (quantity - item.quantity) : quantity;
      agent.Basket.addItem(product.id,updatedQuantity)
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(()=>setSubmitting(false));
    }
    else
    {
      const updatedQuantity = item.quantity - quantity;
      agent.Basket.removeItem(product.id,updatedQuantity)
      .then(() => dispatch(removeItem({productId: product.id,quantity: updatedQuantity})))
      .catch(error => console.log(error))
      .finally(()=> setSubmitting(false))
    }
  }

  if (loading) return <LoadingComponent message="Loading Product..." />;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h4" sx={{ color: "secondary" }}>
          {product.price}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Quantity In Stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
            onChange={handleChange}
            variant="outlined"
            type="number"
            label="Quantity in Basket"
            value={quantity}
            fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
            disabled={(item?.quantity === quantity) || (!item && quantity===0)}
            onClick={handleUpdate}
            loading={submitting}
            variant="contained"
            fullWidth
            sx={{height: '55px'}}
            color="primary"
            size="large"
            >
              {item? "Update Quantity": "Add to Basket"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
