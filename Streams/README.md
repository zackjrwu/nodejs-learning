# 📦 Node.js Readable Stream Chunk Size Demo

這是一個使用 Node.js `fs.createReadStream` 的簡單範例，用來展示如何**逐塊（chunk）讀取文字檔案**，並統計每一塊的大小與整體讀取行為。

---

## 🚀 功能特色

- 使用 `fs.createReadStream` 讀取檔案內容（預設 chunk 大小為 **64KB**）
- 透過事件機制（`.on('data')`, `.on('end')`, `.on('error')`）非同步處理檔案資料
- 自動統計：
  - ✅ 每個 chunk 的大小（bytes）
  - ✅ 總共讀取幾個 chunk
  - ✅ 所有 chunk 的**總大小**
  - ✅ 最後一個 chunk 的大小
  - ✅ 檔案是否「一次就讀完」

---

## 💡 Stream 核心觀念備忘

| 問題 | 回答 |
|------|------|
| `fs.createReadStream()` 可以用 callback 嗎？ | ❌ 不行，它回傳的是 Stream 物件，不支援傳統 callback 形式 |
| 要怎麼接資料？ | ✅ 使用 `.on('data')`, `.on('end')`, `.on('error')` 等事件綁定 |
| 如果想要 callback 模式？ | ✅ 可以自行封裝邏輯，將所有資料組合起來後用 callback 傳出（模擬 readFile 行為） |

---

## ⚙️ 自訂選項：chunk 大小（`highWaterMark`）

若希望自訂每次讀取的 chunk 大小，可以設定 `highWaterMark`，例如設定為 8KB：

```js
const readable = fs.createReadStream('./story.txt', {
  encoding: 'utf8',
  highWaterMark: 8 * 1024 // 每次讀取 8KB
});
```

---

## 🔄 Streams Pipe 功能

本專案新增了 `pipes-example.js`，展示了 Node.js streams 中 `pipe()` 方法的強大功能：

- ✅ 使用 `pipe()` 簡化串流間的資料傳輸
- ✅ 展示管道鏈（pipe chaining）的實作方式
- ✅ 實用的文件壓縮與解壓縮範例
- ✅ 完整的錯誤處理與狀態報告

### 主要功能展示

| 範例 | 功能描述 |
|------|---------|
| 基本文件複製 | 展示如何使用 `pipe()` 簡潔地從可讀串流直接複製到可寫串流 |
| 文件壓縮 | 使用 `zlib.createGzip()` 與 `pipe()` 鏈式操作實現文件壓縮 |
| 文件解壓縮 | 使用 `zlib.createGunzip()` 展示如何解壓縮檔案並驗證完整性 |

### 使用方式

只需執行：

```js
node pipes-example.js
```

系統會依序執行：

1. 文件複製操作
2. 文件壓縮操作（展示壓縮率）
3. 文件解壓縮操作（驗證與原始文件內容一致性）

### 為什麼使用 pipe()？

使用 `pipe()` 相較於手動處理 `data` 事件和 `write()` 方法有以下優點：

- ✅ 程式碼更簡潔易讀
- ✅ 自動處理背壓（backpressure）問題
- ✅ 錯誤處理更一致
- ✅ 支援鏈式操作，可以輕鬆組合多個串流處理步驟
