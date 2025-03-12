const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('./JwtService');
class UserService {
    async createUser(data) {
        return new Promise(async (resolve, reject) => {
            try{
                const { Email, Password } = data;
                const checkUser = await User.findOne({ Email: Email });
                if(checkUser) {
                    reject({
                        status: 'error',
                        message: 'Email đã tồn tại'
                    });
                }
                // Hash mật khẩu trước khi lưu vào database
                const salt = await bcrypt.genSalt(10);
                
                const hashPassword = await bcrypt.hash(Password, salt);
                const newUser = await User.create({
                    Email: Email,
                    Password: hashPassword
                });
                if(newUser) {
                    resolve({
                        status: 'success',
                        message: 'Tạo tài khoản thành công',
                        data: newUser
                    })
                }
            }catch(error){
                console.log(error);
                reject({
                    status: 'error',
                    message: 'Internal Server Error'
                });
            }
        });

    }
    async updateUser(userId,data) {
        return new Promise(async (resolve, reject) => {
            try {
                const { Email,FullName,Address,Phone,isAdmin } = data;
                const checkUser = await User.findOne({ _id: userId });
                if (!checkUser) {
                    reject({
                        status: 'error',
                        message: 'User không tồn tại'
                    });
                }
                const updateUser = await User.findByIdAndUpdate(userId, data, { new: true });
                resolve({
                    status: 'success',
                    message: 'Cập nhật thông tin thành công',
                    data: updateUser
                });
            } catch (error) {
                console.log(error);
                reject({
                    status: 'error',
                    message: 'Internal Server Error'
                });
            }
        });
    }
    async loginUser(data){
        // viết dưới dạng promise
        return new Promise(async (resolve, reject) => {
            try {
                // Kiểm tra email
                const { Email, Password } = data;
                const checkUser = await User.findOne({ Email: Email });
                if (!checkUser) {
                    resolve({
                        status: 'error',
                        error: 'email',
                        message: 'Email không tồn tại'
                    });
                }
                const comparePassword = await bcrypt.compare(Password, checkUser.Password);
                if (!comparePassword) {
                    resolve({
                        status: 'error',
                        error: 'password',
                        message: 'Sai mật khẩu'
                    });
                }
                // Tạo token
                const access_token = await generateAccessToken({
                    id: checkUser._id,
                    isAdmin: checkUser.isAdmin
                });
                const refresh_token = await generateRefreshToken({
                    id: checkUser._id,
                    isAdmin: checkUser.isAdmin
                });
                resolve({
                    status: 'success',
                    message: 'Đăng nhập thành công',
                    access_token,
                    refresh_token
                });
            } catch (error) {
                console.log(error);
                reject({
                    status: 'error',
                    message: 'Internal Server Error1'
                });
            }
        
        });
    }
    async deleteUser(userId){
        return new Promise(async (resolve, reject) => {
            try {
                const checkUser = await User.findOne({ _id: userId });
                if (!checkUser) {
                    reject({
                        status: 'error',
                        message: 'User không tồn tại'
                    });
                }
                const deleteUser = await User.findByIdAndDelete(userId);
                resolve({
                    status: 'success',
                    message: 'Xóa user thành công'
                });
            } catch (error) {
                console.log(error);
                reject({
                    status: 'error',
                    message: 'Internal Server Error'
                });
            }
        });
    }
    async getAllUsers(){
        return new Promise(async (resolve, reject) => {
            try {
                const users = await User.find();
                resolve({
                    status: 'success',
                    message: 'Lấy danh sách user thành công',
                    data: users
                });
            } catch (error) {
                console.log(error);
                reject({
                    status: 'error',
                    message: 'Internal Server Error'
                });
            }
        });
    }
    async getUserDetail(userId){
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ _id: userId });
                if (!user) {
                    reject({
                        status: 'error',
                        message: 'User không tồn tại'
                    });
                }
                resolve({
                    status: 'success',
                    message: 'Lấy thông tin user thành công',
                    data: user
                });
            } catch (error) {
                console.log(error);
                reject({
                    status: 'error',
                    message: 'Internal Server Error'
                });
            }
        });
    }

}
module.exports = new UserService();