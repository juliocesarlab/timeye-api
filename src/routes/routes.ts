import { Router } from 'express';
import TasksController from '../controllers/TasksController';
import UsersController from '../controllers/UsersController';


const routes = Router();


//Users routes
routes.get('/users', UsersController.index)
routes.get('/users/:id', UsersController.show)
routes.post('/users', UsersController.create)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.destroy)

//Task Routes

routes.get('/users/:user_id/tasks', TasksController.index)
routes.post('/users/:user_id/tasks', TasksController.create)
routes.get('/users/:user_id/tasks/:id', TasksController.show)
routes.put('/users/:user_id/tasks/:id', TasksController.update)
routes.delete('/users/:user_id/tasks/:id', TasksController.destroy)


export default routes;

