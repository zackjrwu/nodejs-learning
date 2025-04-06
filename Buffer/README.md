# 📦 Buffer Demo in Node.js

這是一個簡單的 Node.js 程式範例，用來幫助你理解 `Buffer` 的運作原理，包含：

- 如何建立 Buffer
- 如何讀取 Buffer 資料
- Buffer 與 UTF-8 編碼的對應
- `console.log` 行為差異
- Buffer 的寫入與覆蓋行為

---

## 📄 buffer-demo.js 說明

### ✅ 程式功能：

```js
const buf = Buffer.from('Hello', 'utf-8');
```

- 建立一個 buffer，內含字串 `'Hello'` 的 UTF-8 編碼。
- Buffer 實際內容為：`<Buffer 48 65 6c 6c 6f>`（十六進位）

```js
console.log(buf.toString());
```

- 將 Buffer 還原為字串 → `Hello`

```js
console.log(buf.toJSON());
```

- 查看 Buffer 的 JSON 表現形式（十進位 byte 陣列）

```js
console.log(buf[2]);
```

- 查看第三個 byte 的值 → 對應字元 `'l'` → `108`（十進位）

```js
buf.write('wo');
```

- 將 `'wo'` 寫入 buffer 的開頭 → 覆蓋前兩個 byte → 原本 `'Hello'` 變成 `'wollo'`

---

## 💡 重點觀念

- `Buffer` 是 Node.js 處理二進位資料（如圖片、檔案、網路傳輸）非常重要的工具。
- Node.js 在印出 Buffer 時會自動轉為十六進位格式，幫助開發者 debug。
- `Buffer.write()` 預設從索引 0 開始寫入，會覆蓋原始內容。
- 用 `toJSON()` 可以看到每個 byte 的數值（十進位格式）。

---

## 🚀 執行方式

```bash
node buffer-demo.js
```

---

歡迎進一步探索：

- `Buffer.alloc()`、`Buffer.allocUnsafe()`
- `buf.slice()`、`buf.copy()`
- 與 `Stream` 一起使用的 Buffer chunk 操作

---

Happy Buffering! 🎉
