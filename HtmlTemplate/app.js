// Dynamic Template Demo
// 引入 http 和 fs 模組和 path 模組
import http from 'http';
import fs from 'fs';
import path from 'path';
// 設置 __dirname
const __dirname = path.resolve();
// 創建 HTTP 伺服器
const server = http.createServer((req, res) => {
  // 讀取 index.html 檔案

  let html = fs.readFileSync(__dirname + '/index.html', 'utf-8');

  // 設置 HTTP 標頭
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // 替換 {message} 的內容
  const message = 'Hello World Bye Bye!';
  html = html.replace('{message}', message);

  // 回應 HTML 內容
  res.end(html);
  // 監聽 1337 端口
}).listen(1337, '127.0.0.1', () => {
    console.log('Server is running on port 1337');
});
