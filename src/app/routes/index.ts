import express, { Request,Response } from 'express';

const router = express.Router();
// for example
const yourMiddlewareFunction = (req:Request, res:Response) => {
  res.send("Hello from your middleware! helllllo");
};



const moduleRoutes = [
  // ... routes
  {
    path: "",
    routes: yourMiddlewareFunction
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
