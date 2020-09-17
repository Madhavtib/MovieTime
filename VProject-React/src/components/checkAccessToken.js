import axios from 'axios'
import getAccessToken from './getAccessToken'

export default function checkAccessToken() {
    const token = Buffer
                        .from(`public:private`, 'utf8')
                        .toString('base64');
    
    const config = {
        headers: {
            Authorization: `Basic ${token}`
        }
    }
    console.log(token,config,getAccessToken())
    return axios.get("http://localhost:8763/api/authserver/oauth/check_token?token="+getAccessToken(),config)
}