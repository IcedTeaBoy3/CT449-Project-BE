const UserService = require('../services/UserService');
class UserController {
    async getAllUsers(req, res) {
        try{
            const data = await UserService.getAllUsers();
            res.json(data);
        }catch(error){
            console.log(error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    }
    async getUserDetail(req, res) {
        try{
            const userId = req.params.id;
            if(!userId){
                return res.json({
                    status: 'error',
                    message: 'User không tồn tại'
                });
            }
            const data = await UserService.getUserDetail(userId);
            res.json(data);
        }catch(error){
            console.log(error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    }
    async createUser(req, res) {
        try{
            const { FullName, Email, Password, ConfirmPassword, Phone } = req.body;
            if(!Email || !Password || !ConfirmPassword || !FullName || !Phone) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Vui lòng nhập đầy đủ thông tin'
                });
            }
            const emailRegex = /\S+@\S+\.\S+/;
            const validEmail = emailRegex.test(Email);
            if(!validEmail) {
                return res.status(400).json({
                    status: 'error',
                    error: 'email',
                    message: 'Email không hợp lệ'
                });
            }
            if(Password !== ConfirmPassword) {
                return res.status(400).json({
                    status: 'error',
                    error: 'password',
                    message: 'Mật khẩu không khớp'
                });
            }
            const data = await UserService.createUser(req.body);
            res.json(data);
        }catch(error){
            console.log(error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    }
    async updateUser(req, res) {
        try{
            // FullName: { type: String },
            // Date: { type: Date},
            // Email: { type: String, required : true },
            // Password: { type: String, required: true},
            // isAdmin: { type: Boolean, required: true, default: false },
            // Address: { type: String},
            // Phone: { type: String},
            const userId = req.params.id;
            const { Email,FullName,Address,Phone} = req.body;
            if(!Email || !FullName || !Address || !Phone) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Vui lòng nhập đầy đủ thông tin'
                });
            }
            if(!userId){
                return res.json({
                    status: 'error',
                    message: 'User không tồn tại'
                });
            }
            const data = await UserService.updateUser(userId,req.body);
            res.json(data);
        }catch(error){
            console.log(error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    }
    async deleteUser(req, res) {
        try{
            const userId = req.params.id;
            if(!userId){
                return res.json({
                    status: 'error',
                    message: 'User không tồn tại'
                });
            }
            const data = await UserService.deleteUser(userId);
            res.json(data);
        }catch(error){
            console.log(error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
        
    }
    async loginUser(req, res) {
        try{
            const { Email, Password } = req.body;
            if(!Email || !Password) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Vui lòng nhập đầy đủ thông tin'
                });
            }
            const emailRegex = /\S+@\S+\.\S+/;
            const validEmail = emailRegex.test(Email);
            if(!validEmail) {
                return res.status(400).json({

                    status: 'error',
                    error: 'email',
                    message: 'Email không hợp lệ'
                });
            }
            const data = await UserService.loginUser(req.body);
            res.json(data);
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    }
    async countUser(req, res) {
        try{
            const data = await UserService.countUser();
            res.json(data);
        }catch(error){
            console.log(error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    }
    
}
module.exports = new UserController();