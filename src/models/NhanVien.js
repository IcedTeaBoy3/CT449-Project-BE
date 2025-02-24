const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NhanVienSchema = new Schema(
  {
    MSNV: { type: String, required: true, unique: true },
    HoTenNV: { type: String, required: true },
    Password: { type: String, required: true },
    ChucVu: { type: String, required: true },
    DiaChi: { type: String, required: true },
    SoDienThoai: { type: String, required: true }
  },
  {
    timestamps: true, // Thêm thời gian createdAt, updatedAt
  }
);
module.exports = mongoose.model('NhanVien', NhanVienSchema);