# 🎨 Node.js 動態 HTML 模板魔法師

## 🌟 這是什麼魔法？

這是一個神奇的 Node.js 動態 HTML 模板系統！就像是一個會變魔術的網頁，可以根據你的需求隨時改變內容。想像一下，你有一個魔法畫布（HTML），而 Node.js 就是你的魔法棒，可以隨時在畫布上變出不同的內容！

## 🎯 魔法道具清單

我們需要以下魔法道具：
- `http` 模組：建立魔法傳送門（伺服器）
- `fs` 模組：讀取魔法卷軸（檔案）
- `path` 模組：指引魔法之路（路徑）

## ✨ 魔法步驟解析

### 1. 準備魔法道具
```javascript
import http from 'http';
import fs from 'fs';
import path from 'path';
```

### 2. 設置魔法陣地
```javascript
const __dirname = path.resolve();
```

### 3. 施展魔法
```javascript
const server = http.createServer((req, res) => {
  // 讀取魔法卷軸
  let html = fs.readFileSync(__dirname + '/index.html', 'utf-8');
  
  // 設置魔法標記
  res.writeHead(200, { 'Content-Type': 'text/html' });
  
  // 變換魔法內容
  const message = 'Hello World Bye Bye!';
  html = html.replace('{message}', message);
  
  // 完成魔法
  res.end(html);
});
```

## 🎮 如何啟動魔法

1. 打開終端機
2. 進入魔法陣地（專案目錄）
3. 執行魔法咒語：`node app.js`
4. 打開瀏覽器，訪問 `http://127.0.0.1:1337`

## 🎓 魔法重點

1. **動態內容替換**：使用 `{message}` 作為魔法標記
2. **同步檔案讀取**：使用 `readFileSync` 讀取 HTML
3. **HTTP 標頭設置**：告訴瀏覽器這是 HTML 內容
4. **端口監聽**：在 1337 端口等待訪客

## 💡 魔法小技巧

- 可以替換多個魔法標記
- 可以加入更多動態內容
- 可以根據不同請求顯示不同內容
- 可以加入 CSS 和 JavaScript 魔法效果

## 🚀 進階魔法

1. 添加更多動態內容
2. 使用模板引擎（如 EJS）
3. 加入資料庫連接
4. 實現動態路由

## ⚠️ 魔法注意事項

- 記得處理檔案讀取錯誤
- 注意記憶體使用量
- 考慮使用非同步檔案讀取
- 記得關閉伺服器

### 🚫 如何優雅地關閉魔法陣地（伺服器）

在 `app.js` 中添加以下魔法咒語：

```javascript
// 處理關閉信號
process.on('SIGTERM', () => {
  console.log('收到 SIGTERM 信號，準備關閉伺服器...');
  server.close(() => {
    console.log('伺服器已關閉！');
    process.exit(0);
  });
});

// 處理 Ctrl+C
process.on('SIGINT', () => {
  console.log('收到 SIGINT 信號，準備關閉伺服器...');
  server.close(() => {
    console.log('伺服器已關閉！');
    process.exit(0);
  });
});
```

這樣做的好處是：
1. 確保所有連接都被正確關閉
2. 防止資料遺失
3. 讓伺服器優雅地結束
4. 避免殭屍進程

## 🎯 練習魔法

1. 試試改變 `message` 的內容
2. 添加新的魔法標記
3. 加入一些 CSS 樣式
4. 實現簡單的表單提交

---

希望這個魔法教學對你有幫助！記住，在程式設計的世界裡，每個功能都是一個神奇的魔法！✨
