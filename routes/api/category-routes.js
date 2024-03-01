const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const catagoryData = await Category.findAll(req.params.id, {
      include:[{ model: Product, through: Catagory, as: 'catagory_product'}]
      // be sure to include its associated Products
    })
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const catagoryData = await Category.findByPk(req.params.id, {
      include:[{ model: Product, through: Catagory, as: 'catagory_product'}]
      // be sure to include its associated Products
    });
    if (!catagoryData) {
      res.status (404).json({ message: 'no catagory found with this id'});
      return;
    }
    res.status(200).json(catagoryData);
  } catch(err) {
    res.status(500).json(err);
  }
  
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const catagoryData = await Category.create(req.body);
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', (req, res) => {

});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const catagoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!catagoryData) {
      res.status(404).json({ message: 'No catagory found with this id'});
      return;
    }
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
