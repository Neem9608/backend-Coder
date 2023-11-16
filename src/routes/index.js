import viewsRouter from './viewRouter.js';
import productsRouter from './productsRouter.js';
import cartsRouter from './cartsRouter.js';
import sessionsRouter from './sessionRouter.js';

export default (app) => {
    app.use('/', viewsRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/carts', cartsRouter);
    app.use('/api/sessions', sessionsRouter);
};