const userRoutes = require('./UserRoute');
const productRoutes = require('./ProductRoute');
const nxbRoutes = require('./NhaXuatBanRoute');
const routes = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/nxb', nxbRoutes);
}
module.exports = routes;