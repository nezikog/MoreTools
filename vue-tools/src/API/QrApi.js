import axios from 'axios';

const path = 'https://api.qrserver.com/v1/create-qr-code/';

export function getQrCode(params) {
    return axios.get(path, {
        params,
        responseType: 'blob'
    });
}


const downloadQrByFormat = async (format) => {
    if (!url.value) return;

    try {
        const response = await getQrCode({
            data: url.value,
            size: `${size.value}x${size.value}`,
            color: color.value.replace('#', ''),
            bgcolor: 'ffffff',
            format
        });

        const blobUrl = URL.createObjectURL(response.data);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `qr-code.${format}`;
        link.click();

        URL.revokeObjectURL(blobUrl);
    } catch (e) {
        console.error(`Download ${format} error`, e);
    }
};
