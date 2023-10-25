import * as CryptoJS from 'crypto-js';

// 定义请求选项接口，包括方法、URL和头信息
interface RequestOptions {
    method: string;
    url: URL;
    headers: Record<string, string>;
}

// 定义规范化函数，用于对字符串进行URL编码，并替换特定字符
function normalize(string: string, encodingSlash?: boolean): string {
    const kEscapedMap: Record<string, string> = {
        '!': '%21',
        '\'': '%27',
        '(': '%28',
        ')': '%29',
        '*': '%2A'
    };

    if (string === null) {
        return "";
    }
    let result: string = encodeURIComponent(string);
    result = result.replace(/[!'()*]/g, $1 => kEscapedMap[$1]);

    if (encodingSlash === false) {
        result = result.replace(/%2F/gi, '/');
    }

    return result;
}

// 生成规范化URI
function generateCanonicalUri(url: URL): string {
    const resources: string[] = url.pathname.split('/');
    let normalizedResourceStr: string = "";
    for (let i = 0; i < resources.length; i++) {
        normalizedResourceStr += `/${  normalize(resources[i])}`;
    }
    return normalizedResourceStr;
}

// 生成规范化查询字符串
function generateCanonicalQueryString(url: URL): string {
    const queryList: Array<[string, string]> = Array.from(url.searchParams.entries());
    const normalizedQueryList: string[] = [];
    for (let i = 0; i < queryList.length; i++) {
        if (queryList[i][0].toLowerCase() === "authorization") {
            continue;
        }
        normalizedQueryList.push(`${normalize(queryList[i][0])  }=${  normalize(queryList[i][1])}`);
    }
    normalizedQueryList.sort();
    return normalizedQueryList.join('&');
}

// 全局变量，用于存储签名头
let g_signed_headers: string = "";

// 生成规范化头信息
function generateCanonicalHeaders(headers: Record<string, string>): string {
    const defaultHeaders: string[] = ["host", "content-length", "content-type", "content-md5"];
    const keyStrList: string[] = [];
    const usedHeaderStrList: string[] = [];

    for (let i = 0; i < defaultHeaders.length; i++) {
        keyStrList.push(defaultHeaders[i]);
    }
    
    for (const key in headers) {
        if (key.toLowerCase().startsWith("x-bce-")) {
            keyStrList.push(key.toLowerCase());
        }
    }

    for (let i = 0; i < keyStrList.length; i++) {
        const key: string = keyStrList[i];
        const value: string | undefined = headers[key];
        if (!value || value === "") {
            continue;
        }
        usedHeaderStrList.push(`${normalize(key)  }:${  normalize(value)}`);
    }

    usedHeaderStrList.sort();
    const usedHeaderKeys: string[] = [];
    usedHeaderStrList.forEach((item) => {
        usedHeaderKeys.push(item.split(':')[0]);
    });
    g_signed_headers = usedHeaderKeys.join(';');
    return usedHeaderStrList.join('\n');
}

// 导出的generateAuthorization函数，用于生成授权字符串
export function generateAuthorization(requestOptions: RequestOptions, environment: Record<string, string>): string {
    // 获取时间戳
    const timestamp: string = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    // 从环境变量中获取或设置默认的授权版本和过期时间
    const authVersion: string = environment.AuthVersion || "1";
    const expirationInSeconds: string = environment.ExpirationInSeconds || "1800";
    // 从环境变量中获取访问密钥和安全密钥
    const accessKey: string | undefined = environment.AccessKey;
    const secretKey: string | undefined = environment.SecretKey;

    // 生成签名密钥字符串和签名密钥
    const signingKeyStr: string = `bce-auth-v${  authVersion  }/${  accessKey  }/${  timestamp  }/${  expirationInSeconds}`;
    const signingKey: CryptoJS.lib.WordArray = CryptoJS.HmacSHA256(signingKeyStr, secretKey);

    // 生成规范化的URI、查询字符串和头信息
    const canonicalUri: string = generateCanonicalUri(requestOptions.url);
    const canonicalQueryString: string = generateCanonicalQueryString(requestOptions.url);
    const canonicalHeaders: string = generateCanonicalHeaders(requestOptions.headers);

    // 生成规范化请求
    const {method} = requestOptions;
    const canonicalRequest: string = `${method.toUpperCase()  }\n${  canonicalUri  }\n${  canonicalQueryString  }\n${  canonicalHeaders}`;

    // 计算签名
    const signature: CryptoJS.lib.WordArray = CryptoJS.HmacSHA256(canonicalRequest, signingKey.toString());

    // 生成授权字符串
    const Authorization: string = `${signingKeyStr  }/${  g_signed_headers  }/${  signature.toString()}`;
    
    return Authorization;
}
