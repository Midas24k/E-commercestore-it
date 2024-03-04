const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagdata = await Tag.findAll({
      // find all tags
      include: [Product]
      // be sure to include its associated Product data
    })
    res.status(200).json(tagdata);
  } catch (err) {
    console.log("Error: ", err)
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    const tagdata = await Tag.findByPk(req.params.id, {
       include: [Product]
      // be sure to include its associated Product data
    });
    if (!tagdata) {
      res.status(404).json({ message:'no tag found with this id'});
      return;
    }
    res.status(200).json(tagdata);
  } catch (err) {
    console.log("Error: ", err)
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
