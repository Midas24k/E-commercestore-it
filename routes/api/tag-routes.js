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

router.post('/', async (req, res) => {
    const data = req.body;
  try{
    // create a new tag
    const tag = await Tag.create(data);
    res.send(tag)
    res.status(200).json(tag);
  } catch (err) {
    res.status (400).json(err)
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        tag_id:req.params.id,
        productTag_id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: 'no tag id found'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});


// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try{
    const tagdata = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if(!tagdata) {
      res.status(404).json({ message: 'No tag found with id'});
      return;
    }

    res.status(200).json(tagdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
