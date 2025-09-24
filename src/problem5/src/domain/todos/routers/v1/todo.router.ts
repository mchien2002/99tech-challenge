import { Router } from "express";
import { TodoCreate, TodoUpdate } from "../../dtos/todo.dto";
import { TodoService } from "../../services/todo.service";
import { validateRequest } from "../../../../lib/middlewares/validate.request";
import { withResponse } from "../../../../lib/response";

const router = Router();
const todoService = new TodoService();

/**
 * @openapi
 * tags:
 *   - name: Todos
 *     description: API for managing todo tasks
 */

/**
 * @openapi
 * /todos/v1/todo:
 *   post:
 *     summary: Create new Todo task
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Buy groceries"
 *               completed:
 *                 type: boolean
 *                 default: false
 *                 example: false
 *               description:
 *                 type: string
 *                 example: "Do homework"
 *               progress:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       200:
 *         description: Response of task
 */
router.post(
  "/todo",
  validateRequest(TodoCreate),
  withResponse(async (req, res) => {
    return await todoService.create(req.body);
  })
);

/**
 * @openapi
 *  /todos/v1/todos:
 *    get:
 *      summary: List of todo
 *      tags:
 *        - Todos
 *      parameters:
 *        - in: query
 *          name: title
 *          schema:
 *            type: string
 *          description: Filter todos by title (optional)
 *        - in: query
 *          name: completed
 *          schema:
 *            type: boolean
 *          description: Filter todos by completed status (true/false, optional)
 *      responses:
 *        200:
 *          description: Response of task
 */
router.get(
  "/todos",
  withResponse(async (req, res) => {
    return await todoService.fetch(req.query);
  })
);

/**
 * @openapi
 * /todos/v1/todo/{id}:
 *   get:
 *     summary: Get detail of a Todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo
 *     responses:
 *       200:
 *         description: Todo detail
 *       404:
 *         description: Todo not found
 */
router.get(
  "/todo/:id",
  withResponse(async (req, res) => {
    const { id } = req.params;
    return await todoService.findById(id);
  })
);

/**
 * @openapi
 * /todos/v1/todo/{id}:
 *   put:
 *     summary: Update an existing todo
 *     description: Update fields of a todo by its ID
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Buy groceries"
 *               completed:
 *                 type: boolean
 *                 example: true
 *               description:
 *                 type: string
 *                 example: "Do homework"
 *               progress:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       200:
 *         description: Successfully updated todo
 */
router.put(
  "/todo/:id",
  validateRequest(TodoUpdate),
  withResponse(async (req, res) => {
    const { id } = req.params;
    return await todoService.update(id, req.body);
  })
);

/**
 * @openapi
 * /todos/v1/todo/{id}:
 *   delete:
 *     summary: Delete a todo
 *     description: Delete a todo by its ID
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 */

router.delete(
  "/todo/:id",
  withResponse(async (req, res) => {
    const { id } = req.params;
    return await todoService.delete(id);
  })
);

export default router;
