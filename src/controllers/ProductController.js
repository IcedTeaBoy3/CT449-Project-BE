
class ProductController {
    getAllProducts(req, res) {
        console.log('GET /api/products');
        res.json({'message': 'GET /api/products'});
        
    }
    getProductDetail(req, res) {
        console.log('GET /api/products/:id');
        res.json({'message': 'GET /api/products/:id'});
    }
    createProduct(req, res) {
        console.log('POST /api/products');
        res.json({'message': 'POST /api/products'});
    }
    updateProduct(req, res) {
        console.log('PUT /api/products/:id');
        res.json({'message': 'PUT /api/products/:id'});
    }
    deleteProduct(req, res) {
        console.log('DELETE /api/products/:id');
        res.json({'message': 'DELETE /api/products/:id'});
    }
}
module.exports = new ProductController();