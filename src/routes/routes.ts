import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import TasksController from '../controllers/TasksController';
import UsersController from '../controllers/UsersController';
import auth from '../middlewares/auth';



const routes = Router();

/* public routes */

routes.post('/users', UsersController.create)
routes.put('/sessions', SessionsController.create);

routes.use(auth)

/* private routes */

/* Users routes */

routes.get('/users', UsersController.index)
routes.get('/users/:id', UsersController.show)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.destroy)

/* Task Routes */

routes.get('/users/:user_id/tasks', TasksController.index)
routes.get('/users/:user_id/tasks/today', TasksController.getToday)
routes.get('/users/:user_id/tasks/:id', TasksController.show)
routes.post('/users/:user_id/tasks', TasksController.create)
routes.put('/users/:user_id/tasks/:id', TasksController.update)
routes.delete('/users/:user_id/tasks/:id', TasksController.destroy)



export default routes;

