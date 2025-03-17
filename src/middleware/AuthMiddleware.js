const jwt = require('jsonwebtoken');
class AuthMiddleWare {
    // là admin có thể thực hiện các thao tác
    authMiddleWare = (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token =  authHeader && authHeader.split(' ')[1]; // Lấy token từ header
        if (!token) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Unauthorized1' 
            });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ 
                    status: 'error',
                    message: 'Unauthorized2' 
                });
            }
            const isAdmin = user.isAdmin;
            if (!isAdmin) {
                return res.status(403).json({ 
                    status: 'error',
                    message: 'Unauthorized3' 
                });
            }
            next();
        });
    }
    // là user hoặc là admin có thể thực hiện các thao tác
    authUserMiddleWare = (req, res, next) => {
        const authHeader = req.headers["authorization"];

        const token =  authHeader && authHeader.split(' ')[1]; // Lấy token từ header

        
        const userId = req.params.id;
        if (!token) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Unauthorized1' 
            });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ 
                    status: 'error',
                    message: 'Unauthorized2' 
                });
            }
            const isAdmin = user.isAdmin;
            const id = user.id;
            if (!isAdmin && userId !== id) {
                return res.status(403).json({ 
                    status: 'error',
                    message: 'Unauthorized3' 
                });
            }
            next();
        });
    }

}
module.exports = new AuthMiddleWare(); // Export một instance của AuthMiddleWare