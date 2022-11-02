import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';

import useStyles from './styles';


// const products = [
//     { id: 1, name: 'Shoes', description: "Running shoes", price: '$5', image: ' https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80' },
//     { id: 2, name: 'Macbook', description: "Apple", price: '$10', image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-space-gray-config-201810?wid=1078&hei=624&fmt=jpeg&qlt=90&.v=1633033424000' },

  
// ]

const Products = ({products, onAddToCart}) => {

    const classes = useStyles();

    return(
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
            {products.map((product)=> (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} onAddToCart={onAddToCart} />
                </Grid>
            ))}
            </Grid>
    </main>

    );
  
}

export default Products;