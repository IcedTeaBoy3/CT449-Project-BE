
const NhaXuatBan = require('../models/NhaXuatBan');   
class NhaXuatBanController {
    async getAllNXB(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const result = await NhaXuatBan.find().limit(limit);
            res.json({
                status: 'success',
                message: 'Lấy danh sách NXB thành công',
                data: result
            });
        } catch (error) {
            res.json({ message: error });
        }
    }
    async getNXBDetail(req, res) {
        try {
            const id = req.params.id;
            if(!id){
                return res.json({
                    status: 'error',
                    message: 'NXB không tồn tại'
                });
            }
            const result = await NhaXuatBan.findById(id);
            res.json({
                status: 'success',
                message: 'Lấy thông tin NXB thành công',
                data: result
            });
        } catch (error) {
            res.json({ message: error });
        }
    }
    async createNXB(req, res) {
        const { MaNXB, TenNXB, DiaChi} = req.body;
        if(!MaNXB || !TenNXB || !DiaChi) {
            return res.json({
                status: 'error',
                message: 'Vui lòng nhập đầy đủ thông tin'
            });
        }
        const checkNXB = await NhaXuatBan.findOne({ MaNXB });
        if(checkNXB) {
            return res.json({
                status: 'error',
                message: 'Mã NXB đã tồn tại'
            });
        }
        try {
            const result = await NhaXuatBan.create({
                MaNXB,
                TenNXB,
                DiaChi
            });
            res.json({
                status: 'success',
                message: 'Thêm NXB sách thành công',
                data: result
            });
        } catch (error) {
            res.json({ message: error });
        }
    }
    async updateNXB(req, res) {
        try{
            const _id = req.params.id;
            
            const { MaNXB, TenNXB,DiaChi } = req.body;
           
            if(!_id){
                return res.json({
                    status: 'error',
                    message: 'NXB không tồn tại'
                });
            }
            const result = await NhaXuatBan.findByIdAndUpdate(_id, {
                MaNXB,
                TenNXB,
                DiaChi
            });
            res.json({
                status: 'success',
                message: 'Cập nhật NXB thành công',
                data: result
            });
        }
        catch(error){
            res.json({ message: error });
        }
    }
    async deleteNXB(req, res) {
        try {
            const id = req.params.id;
            if(!id){
                return res.json({
                    status: 'error',
                    message: 'NXB không tồn tại'
                });
            }
            const result = await NhaXuatBan.findByIdAndDelete(id);
            res.json({
                status: 'success',
                message: 'Xóa NXB thành công',
                data: result
            });
        } catch (error) {
            res.json({ message: error });
        }
    }
}
module.exports = new NhaXuatBanController();