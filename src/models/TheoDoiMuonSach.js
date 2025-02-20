const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TheoDoiMuonSachSchema = new Schema(
    {
        maDocGia: { type: mongoose.Schema.Types.ObjectId, ref: 'DocGia', required: true },
        maSach: { type: mongoose.Schema.Types.ObjectId, ref:'Sach', required: true },
        ngayMuon: { type: Date, required: true },
        ngayTra: { type: Date, required: true },
    },
    {
        timestamps: true, // Thêm thời gian createdAt, updatedAt
    }
);
module.exports = mongoose.model('TheoDoiMuonSach', TheoDoiMuonSachSchema);
// TheoDoiMuonSachSchema là một đối tượng Schema, dùng để định nghĩa cấu trúc của collection TheoDoiMuonSach trong MongoDB.