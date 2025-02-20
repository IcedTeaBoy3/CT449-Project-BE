
const ProductService = require('../services/ProductService');
const Sach = require('../models/Sach');
class ProductController {
    async getAllProducts(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const products = await Sach.find().limit(limit);
            res.json({
                status: 'success',
                message: 'Lấy danh sách sách thành công',
                data: products
            });
        } catch (error) {
            res.json({ message: error });
        }
    }
    async getProductDetail(req, res) {
        try {
            const id = req.params.id;
            if(!id){
                return res.json({
                    status: 'error',

                    message: 'Sách không tồn tại'
                });
            }
            const product = await Sach.findById(id);
            res.json({
                status: 'success',
                message: 'Lấy thông tin sách thành công',
                data: product
            });
        } catch (error) {
            res.json({ message: error });
        }
    }
    async createProduct(req, res) {
        const { tenSach, donGia, soQuyen, namXuatBan, tacGia, tenNXB,diaChi } = req.body;
        if(!tenSach || !donGia || !soQuyen || !namXuatBan || !tacGia || !tenNXB || !diaChi) {
            return res.json({
                status: 'error',
                message: 'Vui lòng nhập đầy đủ thông tin'
            });
        }
        const checkSach = await Sach.findOne({ tenSach });
        if(checkSach) {
            return res.json({
                status: 'error',
                message: 'Sách đã tồn tại' 
            });
        }
        try {
            const result = await Sach.create({
                tenSach,
                donGia,
                soQuyen,
                namXuatBan,
                tacGia,
                nhaXuatBan: {
                    tenNXB,
                    diaChi
                }
            });
            res.json({
                status: 'success',
                message: 'Thêm sách thành công',
                data: result
            });
        } catch (error) {
            res.json({ message: error });
        }
    }
    async updateProduct(req, res) {
        try{
            const id = res.params.id;
            if(!id){
                return res.json({
                    status: 'error',
                    message: 'Sách không tồn tại'
                });
            }
            const { tenSach, donGia, soQuyen, namXuatBan, tacGia, tenNXB,diaChi } = req.body;
            const result = await Sach.findByIdAndUpdate(id, {
                tenSach,
                donGia,
                soQuyen,
                namXuatBan,
                tacGia,
                nhaXuatBan: {
                    tenNXB,
                    diaChi
                }
            });
            res.json({
                status: 'success',
                message: 'Cập nhật sách thành công',
                data: result
            });
        }
        catch(error){
            res.json({ message: error });
        }
    }
    async deleteProduct(req, res) {
        try {
            const id = req.params.id;
            if(!id){
                return res.json({
                    status: 'error',
                    message: 'Sách không tồn tại'
                });
            }
            const result = await Sach.findByIdAndDelete(id);
            res.json({
                status: 'success',
                message: 'Xóa sách thành công',
                data: result
            });
        } catch (error) {
            res.json({ message: error });
        }
    }
}
module.exports = new ProductController();