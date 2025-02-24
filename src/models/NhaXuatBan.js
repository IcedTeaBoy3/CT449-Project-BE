const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NhaXuatBanSchema = new Schema(
    {
        MaNXB: { type: String, required: true, unique: true },
        TenNXB: { type: String, required: true },
        DiaChi: { type: String, required: true }
    },
    {
        timestamps: true, // Thêm thời gian createdAt, updatedAt
    }
);
module.exports = mongoose.model('NhaXuatBan', NhaXuatBanSchema);