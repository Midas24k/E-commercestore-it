const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const productData = await Product.findAll({
      include:[Category, Tag]
      // be sure to include its associated Category and Tag data
      
    })
    res.status(200).json(productData);
  } catch (err) {
    console.log("Error", err)
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    // find a single product by its `id`
    const productData = await Product.findByPk(req.params.id, {
      include:[Category, Tag]
      // be sure to include its associated Category and Tag data
    });
    if (!productData) {
      res.status (404).json({ message:'no product found with this id'});
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

// create new product
router.post('/', async (req, res) => {
  try {
    /* req.body should look like this...
      {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
      }
    */
    const {product_name, price, stock, tagIds} = req.body;
    
    const product = await Product.create({
      product_name,
      price,
      stock
    });
    if (tagIds && tagIds.length > 0) {
      console.log(product.product_id)
      const productTagIdArr =  tagIds.map((tag_id) => ({
        product_id: product.product_id,
        tag_id
      }));
      console.log(productTagIdArr)
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(product);  
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create product'})
  }
});

// update product
router.put('/:id',  (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      Product_id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]).then(() => res.json(updatedProduct));
        });
      } else {
        res.json(product);
      }
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
       product_id: req.params.id
        // delete one product by its `id` value
      }
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id'});
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
