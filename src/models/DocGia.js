
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocGiaSchema = new Schema(
    {
        MaDocGia: { type: String, required: true, unique: true },
        HoLot: { type: String, required: true },
        Ten: { type: String, required: true },
        NgaySinh: { type: Date, required: true },
        Phai: { type: String, enum: ['Nam', 'Nữ'], required: true },
        DiaChi: { type: String, required: true },
        DienThoai: { type: String, required: true }
    },
    {
        timestamps: true, // Thêm thời gian createdAt, updatedAt
    }
);
module.exports = mongoose.model('DocGia', DocGiaSchema);
// DocGiaSchema là một đối tượng Schema, dùng để định nghĩa cấu trúc của collection DocGia trong MongoDB.