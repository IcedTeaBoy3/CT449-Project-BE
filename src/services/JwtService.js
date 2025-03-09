const jwt = require('jsonwebtoken');
const generateAccessToken = (payload) => {
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    return access_token;
}
const generateRefreshToken = (payload) => {
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '365d' });
    return refresh_token;
}
const refreshTokenService = (token) => {
    return new Promise(async (resolve, reject) => {
        try{
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
                if(err){
                    reject({
                        status: 'error', 
                        message: 'Invalid token' 
                    });
                }
                const access_token = await generateAccessToken({
                    id: user.id,
                    isAdmin: user.isAdmin
                });
                resolve({
                    status: 'success', 
                    message: 'Token refreshed',
                    access_token
                });
            });
        }
        catch(e){
            reject(e);
        }
    });
}
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    refreshTokenService
}