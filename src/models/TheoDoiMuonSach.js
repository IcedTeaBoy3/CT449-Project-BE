const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TheoDoiMuonSachSchema = new Schema(
    {
        MaDocGia: { type: mongoose.Schema.Types.ObjectId, ref: 'DocGia', required: true },
        MaSach: { type: mongoose.Schema.Types.ObjectId, ref: 'Sach', required: true },
        NgayMuon: { type: Date, required: true },
        NgayTra: { type: Date },
        TrangThai: { type: String, required: true, default: 'Chưa trả' },
    },
    {
        timestamps: true, // Thêm thời gian createdAt, updatedAt
    }
);
module.exports = mongoose.model('TheoDoiMuonSach', TheoDoiMuonSachSchema);
// TheoDoiMuonSachSchema là một đối tượng Schema, dùng để định nghĩa cấu trúc của collection TheoDoiMuonSach trong MongoDB.