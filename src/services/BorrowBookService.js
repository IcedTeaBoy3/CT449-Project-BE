const TheoDoiMuonSach = require('../models/TheoDoiMuonSach');
const Sach = require('../models/Sach');
class BorrowBookService {
    async createBorrowBook(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const { MaDocGia, MaSach, NgayMuon, NgayTra, TrangThai } = data;
                const newBorrowBook = await TheoDoiMuonSach.create({
                    MaDocGia: MaDocGia,
                    MaSach: MaSach,
                    NgayMuon: NgayMuon,
                    NgayTra: NgayTra,
                    TrangThai: TrangThai
                });
                const updateSach = await Sach.findByIdAndUpdate(MaSach, { $inc: { SoQuyen: -1 } }, { new: true });
                if (newBorrowBook) {
                    resolve({
                        status: 'success',
                        message: 'Mượn sách thành công',
                        data: newBorrowBook
                    });
                }


            } catch (error) {
                console.log(error);
                reject({
                    status: 'error',
                    message: 'Lỗi server'
                });
            }
        });
    }
    async getAllBorrowBookByUser(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await TheoDoiMuonSach.find({MaDocGia: userId}).populate('MaSach');
                resolve({
                    status: 'success',
                    message: 'Lấy danh sách mượn sách thành công',
                    data: data
                });
            } catch (error) {
                reject({
                    status: 'error',
                    message: 'Lỗi server'
                });
            }
        });
    }
    async returnBook(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const borrowBook = await TheoDoiMuonSach.findByIdAndUpdate(id, {TrangThai: "Đã trả",NgayTra: new Date()}, {new: true});
                const updateSach = await Sach.findByIdAndUpdate({_id:borrowBook.MaSach}, { $inc: { SoQuyen: 1 } }, { new: true });
                resolve({
                    status: 'success',
                    message: 'Trả sách thành công',
                    data: borrowBook
                });
            } catch (error) {
                reject({
                    status: 'error',
                    message: 'Lỗi server'
                });
            }
        });
    }
    async getAllBorrowBookAdmin(){
        return new Promise(async (resolve, reject) => {
            try {
                const allBorrowBooks = await TheoDoiMuonSach.find().populate('MaSach').populate('MaDocGia');
                resolve({
                    status: 'success',
                    message: 'Lấy danh sách mượn sách thành công',
                    data: allBorrowBooks
                });
            } catch (error) {
                reject({
                    status: 'error',
                    message: 'Lỗi server'
                });
            }
        });
    }
    async approveBorrowBook(id){
        return new Promise(async (resolve, reject) => {
            try {
                const data = await TheoDoiMuonSach.findByIdAndUpdate(id, {TrangThai: "Đã duyệt"}, {new: true});
                resolve({
                    status: 'success',
                    message: 'Duyệt mượn sách thành công',
                    data: data
                });
            } catch (error) {
                reject({
                    status: 'error',
                    message: 'Lỗi server'
                });
            }
        });
    }
    async deleteBorrowBook(id){
        return new Promise(async (resolve, reject) => {
            try {
                const data = await TheoDoiMuonSach.findByIdAndDelete(id);
                if(data.TrangThai !== 'Đã trả'){
                    const updateSach = await Sach.findByIdAndUpdate({_id:data.MaSach}, { $inc: { SoQuyen: 1 } }, { new: true });
                }
                resolve({
                    status: 'success',
                    message: 'Xóa mượn sách thành công',
                    data: data
                });
            } catch (error) {
                reject({
                    status: 'error',
                    message: 'Lỗi server'
                });
            }
        });
    }
    async countBorrowBook(){

        return new Promise(async (resolve, reject) => {
            try {
                const data = await TheoDoiMuonSach.find({ TrangThai: { $ne: "Chờ xác nhận" } }).countDocuments();
                resolve({
                    status: 'success',
                    message: 'Lấy số lượng mượn sách thành công',
                    data: data
                });
            } catch (error) {
                reject({
                    status: 'error',
                    message: 'Lỗi server'
                });
            }
        });
    }

}
module.exports = new BorrowBookService();