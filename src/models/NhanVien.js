const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NhanVienSchema = new Schema(
  {
    hoTenNV: { type: String, maxLength: 255, required: true },
    matKhau: { type: String, maxLength: 255, required: true },
    diaChi: { type: String, maxLength: 255, required: true },
    soDienThoai: { type: String, maxLength: 15, required: true },
    chucVu: { type: String, maxLength: 255, required: true },
  },
  {
    timestamps: true, // Thêm thời gian createdAt, updatedAt
  }
);