
const Sach = require('../models/Sach');
const NXB = require('../models/NhaXuatBan');
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
        const { MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, TacGia, MaNXB } = req.body;
        if(!MaSach || !TenSach || !DonGia || !SoQuyen || !NamXuatBan || !TacGia || !MaNXB) {
            return res.json({
                status: 'error',
                message: 'Vui lòng nhập đầy đủ thông tin'
            });
        }
        const checkSach = await Sach.findOne({ MaSach }); 
        const checkNXB = await NXB.findOne({ MaNXB }); 
        if(checkSach) {
            return res.json({
                status: 'error',
                message: 'Sách đã tồn tại' 
            });
        }
        if(!checkNXB) {
            return res.json({
                status: 'error',
                message: 'Nhà xuất bản không tồn tại' 
            });
        }
        try {
            const result = await Sach.create({
                MaSach,
                TenSach,
                DonGia,
                SoQuyen,
                NamXuatBan,
                TacGia,
                MaNXB
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
            const id = req.params.id;
            if(!id){
                return res.json({
                    status: 'error',
                    message: 'Sách không tồn tại'
                });
            }
            const { MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, TacGia, MaNXB } = req.body;
            const result = await Sach.findByIdAndUpdate(id, {
                MaSach,
                TenSach,
                DonGia,
                SoQuyen,
                NamXuatBan,
                TacGia,
                MaNXB
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