# Node.js HTTP Web Server

## 基本概念

學習如何使用 Node.js 創建一個基本的 HTTP 伺服器。這是一個很好的入門點，幫助我們理解 Node.js 的核心功能。

## 代碼解析

```javascript
import http from 'http';

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1', () => {
    console.log('Server is running on port 1337');
});
```

### 重要組件說明

1. **HTTP 模組**
   - 使用 `import http from 'http'` 導入 Node.js 的內建 HTTP 模組
   - 這個模組提供了創建 HTTP 伺服器所需的所有功能

2. **createServer 方法**
   - 用於創建一個新的 HTTP 伺服器實例
   - 接受一個 callback function 作為參數，該 function 在每次收到請求時被調用

3. **請求處理**
   - `req` 參數包含請求的詳細信息
   - `res` 參數用於發送響應給客戶端

4. **響應設置**
   - `res.writeHead()` 設置 HTTP 狀態碼和響應頭
   - `res.end()` 發送響應內容並結束響應

5. **伺服器監聽**
   - `listen()` 方法啟動伺服器
   - 指定 port（1337）和主機地址（127.0.0.1）
   - 提供一個 callback function 在伺服器啟動時執行

## 學習要點

1. **模組化開發**
   - Node.js 使用模組系統來組織代碼
   - 內建模組可以直接導入使用

2. **非阻塞 I/O**
   - Node.js 使用事件驅動和非阻塞 I/O 模型
   - 通過回調函數處理異步操作

3. **HTTP 協議基礎**
   - 理解請求和響應的基本結構
   - 掌握 HTTP 狀態碼和頭部信息的使用

## 下一步

1. 添加更多路由處理
2. 實現靜態文件服務
3. 添加錯誤處理機制
4. 學習使用 Express.js 框架
5. 實現 RESTful API

## 注意事項

- 確保 port 未被其他程序佔用
- 在生產環境中需要添加適當的錯誤處理
- 考慮添加安全相關的響應頭
- 注意處理跨域請求（CORS）問題 