const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })

  .then((Data) => {
    res.json(data);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
Category.findOne({
  where: {
    id: req.params.id
  },
  include: {
    model: Product,
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
  }
})
.then((Data) => {

if (Data.length === 0) {
  res.status(404).json({message: `No Categories were found. Try Again`});
  return;
}

res.json(Data)

});
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  
  .then((newCategory) => {
    res.json(newCategory);
  })

  .catch((err) => {
    res.json(err);
  });

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })

  .then(Data => {
    if (!Data) {
      res.status(404).json({message: `Category with this id not found. Please use a valid id.`});
      return;
    }
    res.json(Data, {message: `Cateogry has been updated.`});
  })

  .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })

  .then((deleteCategory) => {
    if (deleteCategory === 0) {
      res.status(404).json({message: `Not a valid cateogory id. Please try again.`});
      return;
    }

    res.json;
  })

  .catch((err) => res.json(err));
});

module.exports = router;
