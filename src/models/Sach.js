const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SachSchema = new Schema(
  {
    MaSach: { type: String, required: true, unique: true },
    TenSach: { type: String, required: true },
    TheLoai: { type: String},
    HinhAnh: { type: String },
    DonGia: { type: Number, required: true },
    SoQuyen: { type: Number, required: true },
    NamXuatBan: { type: Number, required: true },
    MaNXB: { type: String, ref: 'NhaXuatBan', required: true },
    TacGia: { type: String, required: true }
  },
  {
    timestamps: true, // Thêm thời gian createdAt, updatedAt
  }
);

module.exports = mongoose.model('Sach', SachSchema);
