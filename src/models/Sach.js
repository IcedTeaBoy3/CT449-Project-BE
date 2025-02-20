const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SachSchema = new Schema(
  {
    tenSach: { type: String, maxLength: 255, required: true, unique: true, index: true },
    donGia: { type: Number, required: true },
    soQuyen: { type: Number, required: true },
    namXuatBan: { type: Number, required: true },
    tacGia: { type: String, required: true },
    nhaXuatBan: {
      tenNXB: { type: String, maxLength: 255, required: true },
      diaChi: { type: String, maxLength: 255, required: true },
    }
  },
  {
    timestamps: true, // Thêm thời gian createdAt, updatedAt
  }
);

module.exports = mongoose.model('Sach', SachSchema);
