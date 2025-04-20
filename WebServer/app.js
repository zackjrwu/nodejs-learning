import http from 'http';

// 創建一個 HTTP 伺服器
 http.createServer((req, res) => {
    // 設置 HTTP 標頭
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // 寫入響應主體
    res.end('Hello World\n');
    // 監聽 1337 端口
}).listen(1337, '127.0.0.1', () => {
    console.log('Server is running on port 1337');
});