const userRoutes = require('./UserRoute');
const productRoutes = require('./ProductRoute');
const nxbRoutes = require('./NhaXuatBanRoute');
const borrowBookRoutes = require('./BorrowBookRoute');
const routes = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/nxb', nxbRoutes);
    app.use('/api/borrow-books', borrowBookRoutes);
}
module.exports = routes;