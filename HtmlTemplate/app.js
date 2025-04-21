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
});

// 監聽 1337 端口
server.listen(1337, '127.0.0.1', () => {
    console.log('Server is running on port 1337');
});

// 處理關閉信號
const gracefulShutdown = () => {
  console.log('準備關閉伺服器...');
  server.close(() => {
    console.log('伺服器已關閉！');
    process.exit(0);
  });

  // 如果 10 秒內沒有關閉，強制結束
  setTimeout(() => {
    console.log('強制關閉伺服器');
    process.exit(1);
  }, 10000);
};

// 處理 SIGTERM 和 SIGINT 信號
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);