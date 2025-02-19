const userRoutes = require('./userRoute');
const productRoutes = require('./productRoute');
const routes = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
}
module.exports = routes;