# 🎨 Node.js 動態 HTML 模板魔法師

// ... existing code ...

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

// ... existing code ...