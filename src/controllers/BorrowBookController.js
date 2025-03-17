const BorrowBookService = require('../services/BorrowBookService');
class BorrowBookController {

    async createBorrowBook(req, res) {
        try {
            const { MaDocGia, MaSach, NgayMuon, NgayTra, TrangThai } = req.body;
            if(!MaDocGia){
                return res.json({
                    status: 'error',
                    message: 'MaDocGia không tồn tại'
                });
            }
            if(!MaSach){
                return res.json({
                    status: 'error',
                    message: 'MaSach không tồn tại'
                });
            }
            const data = await BorrowBookService.createBorrowBook(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getAllBorrowBookByUser(req, res) {
        try {
            const userId = req.params.id;
            if(!userId){
                return res.json({
                    status: 'error',
                    message: 'userId không tồn tại'
                });
            }
            const data = await BorrowBookService.getAllBorrowBookByUser(userId);
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async returnBook(req, res) {
        try {
            const id = req.params.id;
            if(!id){
                return res.json({
                    status: 'error',
                    message: 'id không tồn tại'
                });
            }
            const data = await BorrowBookService.returnBook(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getAllBorrowBookAdmin(req, res){
        try{
            const data = await BorrowBookService.getAllBorrowBookAdmin()
            res.status(200).json(data)
        }catch (error){
            res.status(400).json({message: error.message })
        }
    }
    async approveBorrowBook(req, res){
        try{
            const id = req.params.id;
            if(!id){
                return res.json({
                    status: 'error',
                    message: 'id không tồn tại'
                });
            }
            const data = await BorrowBookService.approveBorrowBook(id)
            res.status(200).json(data)
        }catch (error){
            res.status(400).json({message: error.message })
        }
    }
    async deleteBorrowBook(req, res){
        try{
            const id = req.params.id;
            if(!id){
                return res.json({
                    status: 'error',
                    message: 'id không tồn tại'
                });
            }
            const data = await BorrowBookService.deleteBorrowBook(id)
            res.status(200).json(data)
        }catch (error){
            res.status(400).json({message: error.message })
        }
    }
}
module.exports = new BorrowBookController();