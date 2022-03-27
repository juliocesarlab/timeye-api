import { Router } from 'express';
import UserController from '../controllers/UserController';

const routes = Router();


//Users routes
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.post('/users', UserController.create)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.destroy)

//Task Routes


export default routes;

