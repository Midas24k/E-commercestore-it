const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll(req.params, {
      include:[Product]
      // be sure to include its associated Products
    })
    res.status(200).json(categoryData);
  } catch (err) {
    console.log("Error: ", err)
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include:[Product]
      // be sure to include its associated Products
    });
    if (!categoryData) {
      res.status(404).json({ message: 'no category found with this id'});
      return;
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err)
    console.log('we didnt get the data');
  }
  
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  console.log("Params: ", req.params);   // --> :id
  console.log("Body Data: ", req.body);   // --> { category_name : ""}
  try {
    const categoryData = await Category.update(req.body,{
      where: {
        category_id: req.params.id
      }
    })
    console.log("Updated Data: ", categoryData);
    res.status(200).json(categoryData);
    // res.send('Successfully updated a product category');
  } catch(error) {
    console.log("Error: ", error)
    res.status(500).json(error);
  }

});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Product.destroy({
      where: {
        category_id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
