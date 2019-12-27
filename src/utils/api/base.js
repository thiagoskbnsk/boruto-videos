export const get = url =>
    global.fetch(url, {
        "Access-Control-Allow-Origin": "*"
    });