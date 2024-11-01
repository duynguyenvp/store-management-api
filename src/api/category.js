import express from "express";
import { checkPermission } from "../middlewares/permission";
import { CategoryRepository } from "../models/category";
import logger from "../logger";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management operations
 */

/**
 * @swagger
 * /category/getAll:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []  # Assuming you use bearer token for authentication
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */

router.get("/getAll", checkPermission("read_record"), async (req, res) => {
  const categories = await CategoryRepository.getAll();
  res.success(categories);
});

/**
 * @swagger
 * /category/findById/{categoryId}:
 *   get:
 *     summary: Retrieve a category by its ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []  # Assuming you use bearer token for authentication
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: The ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Category not found
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */

router.get(
  "/findById/:categoryId",
  checkPermission("read_record"),
  async (req, res) => {
    const id = req.params.categoryId;
    try {
      const category = await CategoryRepository.findById(id);
      res.success(category);
    } catch (error) {
      logger.error("Get category failed: " + JSON.stringify(error));
      res.error("Get category failed", 422, error.message);
    }
  }
);

/**
 * @swagger
 * /category/findByName/{categoryName}:
 *   get:
 *     summary: Retrieve a category by its name
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []  # Assuming you use bearer token for authentication
 *     parameters:
 *       - name: categoryName
 *         in: path
 *         required: true
 *         description: The name of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Category not found
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.get(
  "/findByName/:categoryName",
  checkPermission("read_record"),
  async (req, res) => {
    const name = req.params.categoryName;
    const category = await CategoryRepository.findByName(name);
    res.success(category);
  }
);

/**
 * @swagger
 * /category/create:
 *   put:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []  # Assuming you use bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: "New Category"
 *               note:
 *                 type: string
 *                 description: Additional notes about the category
 *                 example: "This is a new category for testing."
 *     responses:
 *       200:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Create new category successfully"
 *       400:
 *         description: Bad request, invalid input
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.put("/create", checkPermission("create_record"), async (req, res) => {
  const { name, note } = req.body;

  await CategoryRepository.create(name, note);
  res.success({ message: "Create new category successfully" });
});

/**
 * @swagger
 * /category/update:
 *   post:
 *     summary: Update an existing category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []  # Assuming you use bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the category to update
 *                 example: "12345"
 *               name:
 *                 type: string
 *                 description: The new name of the category
 *                 example: "Updated Category"
 *               note:
 *                 type: string
 *                 description: Additional notes about the category
 *                 example: "Updated note for the category."
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Update category successfully"
 *                 data:
 *                   type: object
 *                   description: The updated category data
 *       400:
 *         description: Bad request, invalid input
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.post("/update", checkPermission("update_record"), async (req, res) => {
  const { id, name, note } = req.body;
  try {
    const result = await CategoryRepository.update(id, { name, note });
    res.success({ message: "Update category successfully", data: result });
  } catch (error) {
    logger.error("Update category failed: " + JSON.stringify(error));
    res.error("Update category failed", 422, error.message);
  }
});

/**
 * @swagger
 * /category/delete:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []  # Assuming you use bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the category to delete
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Delete category successfully"
 *       400:
 *         description: Bad request, invalid input
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete", checkPermission("delete_record"), async (req, res) => {
  const { id } = req.body;

  await CategoryRepository.delete(id);
  res.success({ message: "Delete category successfully" });
});

export default router;
