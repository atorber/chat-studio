// 导入必要的库
import axios from 'axios';
import * as crypto from 'crypto';

// 定义变量和常量
const AK: string = "input your AK";
const SK: string = "input your SK";
const host: string = "bcc.bj.baidubce.com";
const method: string = "PUT";
const query: string = "modifyAttribute";
const URI: string = "/v2/instance/i-YufwpQAe";

// 获取x-bce-date
const x_bce_date: string = new Date().toISOString().replace(/\.\d+Z$/, 'Z');

// 定义headers和signedHeaders
const header: Record<string, string> = {
    "Host": host,
    "content-type": "application/json;charset=utf-8",
    "x-bce-date": x_bce_date
};
const signedHeaders: string = "content-type;host;x-bce-date";

// 认证字符串前缀
const authStringPrefix: string = `bce-auth-v1/${AK}/${x_bce_date}/1800`;

// 生成CanonicalRequest
const CanonicalURI: string = encodeURIComponent(URI);
const CanonicalQueryString: string = query;
const result: string[] = [];
for (const key in header) {
    if (Object.prototype.hasOwnProperty.call(header, key)) {
        const tempStr: string = `${encodeURIComponent(key.toLowerCase())}:${encodeURIComponent(header[key])}`;
        result.push(tempStr);
    }
}
result.sort();
const CanonicalHeaders: string = result.join('\n');
const CanonicalRequest: string = `${method}\n${CanonicalURI}\n${CanonicalQueryString}\n${CanonicalHeaders}`;

// 生成signingKey
const signingKey = crypto.createHmac('sha256', SK).update(authStringPrefix).digest();

// 生成Signature
const Signature = crypto.createHmac('sha256', signingKey.toString('hex')).update(CanonicalRequest).digest('hex');

// 生成Authorization并放到header里
header.Authorization = `${authStringPrefix}/${signedHeaders}/${Signature}`;

// 发送API请求并接受响应
const body = {
    "name": "QQQQQQ"
};

const url: string = `http://${host}${URI}`;

// 使用axios发送请求
axios.put(url, body, { headers: header })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
