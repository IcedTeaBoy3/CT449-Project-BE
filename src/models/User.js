
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocGiaSchema = new Schema(
    {
        MaDocGia: { type: mongoose.Schema.Types.ObjectId, required: true },
        FullName: { type: String },
        Date: { type: Date},
        Email: { type: String, required : true },
        Password: { type: String, required: true},
        isAdmin: { type: Boolean, required: true, default: false },
        Address: { type: String},
        Phone: { type: String},
        access_token: { type: String },
    },
    {
        timestamps: true, // Thêm thời gian createdAt, updatedAt
    }
);
module.exports = mongoose.model('DocGia', DocGiaSchema);
// DocGiaSchema là một đối tượng Schema, dùng để định nghĩa cấu trúc của collection DocGia trong MongoDB.