const crypto = require('crypto');

function getGravatar(email) {

    let defaultSize = 500;

    if (!email) {
        return `https://gravatar.com/avatar/?=${defaultSize}&d=retro`;
    }

    let md5 = crypto.createHash('md5').update(email).digest('hex');

    return `https://gravatar.com/avatar/${md5}?=${defaultSize}&d=retro`

}

module.exports = getGravatar;