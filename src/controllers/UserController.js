
class UserController {
    getAllUsers(req, res) {
        console.log('GET /api/users');
    }
    getUserDetail(req, res) {
        console.log('GET /api/users/:id');
    }
    createUser(req, res) {
        console.log('POST /api/users');
    }
    updateUser(req, res) {
        console.log('PUT /api/users/:id');
    }
    deleteUser(req, res) {
        console.log('DELETE /api/users/:id');
    }
    
}
module.exports = new UserController();