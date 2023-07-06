const express = require("express");

const categoriesRouter=express.Router()
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
   }=require('../controllers/categories');
const isAdmin = require("../middlewares/isAdmin");


/**
 * Obtener todas las categorías (solo para administradores)
 * @route GET /categories/admin
 * @group Categorías - Operaciones relacionadas con las categorías
 * @security isAdmin
 * @returns {Array} - Lista de categorías
 */
categoriesRouter.get('/admin',isAdmin,getAllCategories)


/**
 * Obtener una categoría por su ID (solo para administradores)
 * @route GET /categories/admin/{id}
 * @group Categorías - Operaciones relacionadas con las categorías
 * @security isAdmin
 * @param {number} id.path.required - ID de la categoría
 * @returns {Object} - Categoría encontrada
 */
categoriesRouter.get("/admin/:id",isAdmin,getCategoryById);


/**
 * Crear una nueva categoría (solo para administradores)
 * @route POST /categories/admin
 * @group Categorías - Operaciones relacionadas con las categorías
 * @security isAdmin
 * @param {Object} category.body.required - Datos de la categoría a crear
 * @returns {Object} - Categoría creada
 */
categoriesRouter.post("/admin", createCategory);



/**
 * Actualizar una categoría existente (solo para administradores)
 * @route PUT /categories/admin/{id}
 * @group Categorías - Operaciones relacionadas con las categorías
 * @security isAdmin
 * @param {number} id.path.required - ID de la categoría a actualizar
 * @param {Object} category.body.required - Nuevos datos de la categoría
 * @returns {Object} - Categoría actualizada
 */
categoriesRouter.put("/admin/:id", isAdmin,updateCategory);


/**
 * Eliminar una categoría (solo para administradores)
 * @route DELETE /categories/admin/{id}
 * @group Categorías - Operaciones relacionadas con las categorías
 * @security isAdmin
 * @param {number} id.path.required - ID de la categoría a eliminar
 * @returns {Object} - Respuesta de éxito
 */
categoriesRouter.delete("/admin/:id",isAdmin,deleteCategory);

module.exports=categoriesRouter;