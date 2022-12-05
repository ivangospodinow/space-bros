const _ = require('underscore');

// https://javascriptobfuscator.com/Javascript-Obfuscator.aspx


var _0x23c4=["\x41\x42\x43\x4D\x44\x3F\x6C\x6D\x6E\x6F\x70\x71\x45\x46\x49\x56\x57\x58\x59\x5A\x61\x62\x5F\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x72\x73\x74\x75\x4E\x4F\x47\x48\x50\x51\x52\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x4A\x4B\x4C\x53\x54\x55\x38\x39\x2B\x2F\x3D\x3A\x35\x36\x37"];var b64_table=_0x23c4[0];

function b64_encode(data) {
    var o1, o2, o3, h1, h2, h3, h4, bits, r, i = 0, enc = "";
    if (!data) { return data; }
    do {
        o1 = data[i++];
        o2 = data[i++];
        o3 = data[i++];
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        enc += b64_table.charAt(h1) + b64_table.charAt(h2) + b64_table.charAt(h3) + b64_table.charAt(h4);
    } while (i < data.length);
    r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
}

function b64_decode(data) {
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, result = [];
    if (!data) { return data; }
    data += "";
    do {
        h1 = b64_table.indexOf(data.charAt(i++));
        h2 = b64_table.indexOf(data.charAt(i++));
        h3 = b64_table.indexOf(data.charAt(i++));
        h4 = b64_table.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        result.push(o1);
        if (h3 !== 64) {
            result.push(o2);
            if (h4 !== 64) {
                result.push(o3);
            }
        }
    } while (i < data.length);
    return result;
}

function keyCharAt(key, i) {
    return key.charCodeAt(Math.floor(i % key.length));
}

function xor_encrypt(key, data) {
    return _.map(data, function (c, i) {
        return c.charCodeAt(0) ^ keyCharAt(key, i);
    });
}

function xor_decrypt(key, data) {
    return _.map(data, function (c, i) {
        return String.fromCharCode(c ^ keyCharAt(key, i));
    }).join("");
}

var key = '+Jv+?5@r#xS/$UfP';

var XORCipher = {
    encode: function (data) {
        data = xor_encrypt(key, data);
        return b64_encode(data);
    },
    decode: function (data) {
        data = b64_decode(data);
        return xor_decrypt(key, data);
    }
};



var encoded = XORCipher.encode(process.argv[2])

console.log('Input : ' + process.argv[2]);
console.log(encoded);
console.log(XORCipher.decode(encoded));