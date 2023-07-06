const Categories = require("../models/Categories");

/**Obtener todas las categorías */
async function getAllCategories(req, res) {
  try {
    const categories = await Categories.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
}

/**Obtener una categoria por su ID */

async function getCategoryById(req, res) {
  const { id } = req.params;
  try {
    const category = await Categories.findByPk(id);
    if (!category) {
      res.status(404).json({ error: "Categoría no encontrada" });
    } else {
      res.json(category);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la categoría por su ID" });
  }
}

/**Crear una nueva categoria  */

const createCategory=async(req, res) =>{
 console.log(req.body);
  try {
    let category = await Categories.findOne({ where: { name: req.body.name } });
if(category){
    res.status(401).send("Ya existe una categoria con ese nombre.")}
    else{
        const createdCategory=await Categories.create(req.body)
        res.send(`Categoria creada con éxito:${createdCategory.name}`).status(201); 
    }
    } catch (error) {
    res.status(400).json({ error: "Error al crear la categoría" });
  }
}


/**Actualizar una categoria existente */
async function updateCategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Categories.findByPk(id);
    if (!category) {
      res.status(404).json({ error: "Categoría no encontrada" });
    } else {
      category.name = name;
      await category.save();
      res.json(category);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
}

/**Eliminar una categoria */
async function deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const category = await Categories.findByPk(id);
      if (!category) {
        res.status(404).json({ error: "Categoría no encontrada" });
      } else {
        await category.destroy();
        res.json({ message: "Categoría eliminada exitosamente" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la categoría" });
    }
  }
  
  module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };
   
