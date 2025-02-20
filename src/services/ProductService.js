const Sach = require('../models/Sach');
class ProductService {
    async getProducts() {
    
    }
    async createProduct(data) {
        try {
            const result = await Sach.create(data);
            return {
                status: 'success',
                message: 'Product created successfully',
                data: result
            };
        } catch (error) {
            console.error(error);
            return {
                status: 'error',
                message: 'Error creating product'
            };
        }
    }
    
}
module.exports = new ProductService();