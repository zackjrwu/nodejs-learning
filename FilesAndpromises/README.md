# Files and Promises 示例

這個專案展示了如何在 Node.js 中使用 Promise 和檔案系統操作。

## 功能特點

- 使用 `node:fs/promises` 模組進行檔案讀取
- 展示如何正確處理檔案路徑
- 使用 async/await 處理非同步操作
- 錯誤處理示範

## 檔案結構

- `app.js`: 主程式檔案
- `greet.txt`: 範例文字檔案

## 使用方法

1. 確保已安裝 Node.js
2. 在終端機中執行：
   ```bash
   node app.js
   ```

## 程式碼說明

程式使用 `readFile` 函數非同步讀取 `greet.txt` 檔案，並使用 try-catch 進行錯誤處理。同時也展示了如何正確獲取當前檔案的路徑資訊。
