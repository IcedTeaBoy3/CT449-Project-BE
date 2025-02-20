const userRoutes = require('./UserRoute');
const productRoutes = require('./ProductRoute');
const routes = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
}
module.exports = routes;