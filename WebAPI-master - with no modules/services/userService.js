const authConfig = require("../config/auth_config.json");
const axios = require('axios').default;

let getAuthUser = async (accessToken) => {
    
    const url = `${authConfig.issuer}userinfo`;
    const config = {
        headers: {
            "authorization": `Bearer ${accessToken}`
        }
    }

    const user = await axios.get(url, config);

    return user.data;
}

module.exports = {
    getAuthUser
};