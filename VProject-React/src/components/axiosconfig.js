import getAccessToken from './getAccessToken'

export default function axiosconfig() {
    const config = {
        headers: {
            'Authorization': "Bearer " + getAccessToken(),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials':'true',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers':'*'
        },
        responseType: 'json',
    }
    return config
}