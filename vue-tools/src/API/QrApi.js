import axios from 'axios';

const path = 'https://api.qrserver.com/v1/create-qr-code/';

export function getQrCode(params) {
    return axios.get(path, {
        params,
        responseType: 'blob'
    });
}