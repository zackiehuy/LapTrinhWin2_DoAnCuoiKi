const {authenticator} = require('otplib') ;
const qrcode = require('qrcode');


module.exports = {
    secret : authenticator.generateSecret(),
    token : (secret) => authenticator.generate(secret),
    verify: (token, secret)=> authenticator.verify({secret, token}),
    /*generateQRCode:(user, secret) => {

        const otp = authenticator.keyuri(user, "Our TFA App", secret);
        let imagePath = '';
        qrcode.toDataURL(otp, (err, imageUrl) => {
            if (err) {
                console.log('Could not generate QR code', err);
                return;
            }
            imagePath = imageUrl;
        });
        return imagePath;
    }*/
}