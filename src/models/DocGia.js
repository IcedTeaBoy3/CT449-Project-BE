
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocGiaSchema = new Schema(
    {
        hoTenDG: { type: String, maxLength: 255, required: true },
        ngaySinh: { type: Date, required: true },
        phai: { type: Boolean, required: true },
        diaChi: { type: String, maxLength: 255, required: true },
        soDienThoai: { type: String, maxLength: 15, required: true },
    },
    {
        timestamps: true, // Thêm thời gian createdAt, updatedAt
    }
);
module.exports = mongoose.model('DocGia', DocGiaSchema);
// DocGiaSchema là một đối tượng Schema, dùng để định nghĩa cấu trúc của collection DocGia trong MongoDB.