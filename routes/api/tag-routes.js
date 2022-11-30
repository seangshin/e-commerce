const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product, through: ProductTag, as: 'products'}],
    }); 
    return res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as: 'products'}],
    });
    return res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      tag_name: "Orange",
      productIds: [1, 2, 3, 4]
    }
  */
  try {
    const tagData = await Tag.create(req.body);

    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.productIds.length) {
      const productTagIdArr = req.body.productIds.map((productId) => {
        console.log(productId);
        return {
          product_id: productId,
          tagId: tagData.id,
        };
      });
      const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
      res.status(200).json(productTagIds);
    } else {
      //if no product tags, just respond
      res.status(200).json(tagData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    

    const associatedTags = await ProductTag.findAll({ where: { tag_id: req.params.id } }); //find all associated products from ProductTag
    const productTagIds = associatedTags.map(({ productId }) => productId);//get list of current productId
    const newProductTags = req.body.productId //create filtered list of new productId
    .filter((productId) => !productTagIds.includes(productId))
    .map((productId) => {
      return {
        product_id: productId,
        tagId: req.params.id,//??
      };
    });
    
    //figure out which ones to remove
    const productTagsToRemove = associatedTags
    .filter(({ productId }) => !req.body.productId.includes(productId))
    .map(({ id}) => id);

    //run both actions
    const updatedProductTags = await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    res.status(200).json(updatedProductTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
