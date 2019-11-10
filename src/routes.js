import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionControler from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import NotificationController from './app/controllers/NotificationController';
import SubjectController from './app/controllers/SubjectController';
import UserSubjectController from './app/controllers/UserSubjectController';
import StudentController from './app/controllers/StudentController';
import ProfileController from './app/controllers/ProfileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionControler.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.get('/users', UserController.index);

routes.put('/profiles', ProfileController.store);

routes.get('/providers', ProviderController.index);
routes.get('/students', StudentController.index);

routes.get('/subjects', SubjectController.index);
routes.post('/subjects', SubjectController.store);
routes.put('/subjects', SubjectController.update);
routes.delete('/subjects/:id', SubjectController.delete);

routes.post('/userSubjects',  UserSubjectController.store);
routes.get('/userSubjects/:id',  UserSubjectController.indexSubjectByProvider);


routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
