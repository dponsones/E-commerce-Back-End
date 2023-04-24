const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    const categories = await Category.findAll({
      // include associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const category = await Category.findByPk(req.params.id, {
      // include associated Products
      include: [{ model: Product }],
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new category
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const [numAffectedRows, affectedRows] = await Category.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (numAffectedRows === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(affectedRows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const numAffectedRows = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!numAffectedRows) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(numAffectedRows);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
