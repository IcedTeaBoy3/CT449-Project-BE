const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('./JwtService');
const axios = require('axios');
class UserService {
    async createUser(data) {
        return new Promise(async (resolve, reject) => {
            try{
                const { Email, Password, Phone, FullName } = data;
                const MaDocGia = 'DG' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
                // Kiểm tra email đã tồn tại chưa
                const checkUser = await User.findOne({ Email: Email });
                if(checkUser) {
                    resolve({
                        status: 'error',
                        error: 'email',
                        message: 'Email đã tồn tại'
                    });
                }
                // Hash mật khẩu trước khi lưu vào database
                const salt = await bcrypt.genSalt(10);
                
                const hashPassword = await bcrypt.hash(Password, salt);
                const newUser = await User.create({
                    MaDocGia: MaDocGia,
                    FullName: FullName,
                    Email: Email,
                    Password: hashPassword,
                    Phone: Phone,
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
    async loginGoogle(code){
        return new Promise(async (resolve, reject) => {
            try{
                const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    redirect_uri: "postmessage",
                    grant_type: "authorization_code",
                    code,
                });
                const { id_token, access_token } = tokenResponse.data;
                  // Giải mã ID Token để lấy thông tin user
                const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: { Authorization: `Bearer ${access_token}` },
                });
                const { email, name, picture } = userInfo.data;
                // Kiểm tra xem user đã tồn tại trong database chưa
                const checkUser = await User.findOne({ Email: email });
                if(!checkUser){
                    // Tạo mới user
                    const MaDocGia = 'DG' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
                    const newUser = await User.create({
                        MaDocGia: MaDocGia,
                        Email: email,
                        Avatar: picture,
                        FullName: name,
                        isAdmin: false
                    });
                    if(newUser){
                        const access_token_create = await generateAccessToken({
                            id: newUser._id,
                            isAdmin: newUser.isAdmin
                        });
                        const refresh_token = await generateRefreshToken({
                            id: newUser._id,
                            isAdmin: newUser.isAdmin
                        });
                        resolve({
                            status: 'success',
                            message: 'Đăng nhập thành công',
                            access_token: access_token_create,
                            refresh_token
                        });
                    }
                }
                const my_access_token = await generateAccessToken({
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
                    access_token: my_access_token,
                    refresh_token
                });
            }catch(error){
                reject({
                    status: 'error',
                    message: 'Internal Server Error',
                    error: error
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
                    message: 'Xóa người dùng thành công'
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
    async countUser(){
        return new Promise(async (resolve, reject) => {
            try {
                const count = await User.countDocuments({isAdmin: false});
                resolve({
                    status: 'success',
                    message: 'Lấy số lượng user thành công',
                    data: count
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