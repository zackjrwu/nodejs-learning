# ⚖️ 同步 vs 非同步：何時該用？怎麼選？

這是一份對於 JavaScript 中「同步（synchronous）」與「非同步（asynchronous）」程式執行的理解整理，特別針對：

- 實務開發中應該如何決定用同步還是非同步？
- 為什麼有些程式碼放在最上面要用同步？
- 哪些情境適合用 callback？哪些適合 blocking？

---

## ✅ 範例程式碼

```js
const fs = require('fs');

// ✅ 同步：讀取 greet.txt 並立即取得內容
const greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
console.log(greet);

// ✅ 非同步：從同一個檔案讀取，但不會阻塞後續程式
fs.readFile(__dirname + '/greet.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log('Hello~~~!');
```

---

## 📌 執行輸出順序範例（檔案內容為 `Hello World!`）

```
Hello World!   ← 同步印出內容
Hello~~~!      ← 馬上執行（非同步不會卡住）
Hello World!   ← 等 readFile 完成後 callback 被呼叫印出
```

---

## 🧠 關鍵理解

### 🔸 同步（sync）會阻塞主執行緒

- 程式會「卡在那一行」，直到資料讀取完
- 適合用在程式**一開始就必須完成、不能錯的任務**
- 例如：讀取設定檔、啟動環境參數、初始化必要資料

### 🔸 非同步（async）不會阻塞流程

- 執行會直接繼續往下跑，資料讀取完成後再進入 callback
- 適合用在程式啟動後、**可以等待的任務**
- 例如：讀取使用者資料、撈 API、上傳檔案、互動處理等

---

## ✅ 為什麼同步操作常放在「最上層」？

因為：

1. 那些操作是「系統啟動」的必要步驟
2. 如果失敗就沒必要繼續往下執行（應該直接 throw）
3. 你希望系統在一開始就知道有沒有問題，越早 fail 越好

**範例：**

```js
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
```

---

## 🔁 callback 與非同步設計

```js
fs.readFile(path, encoding, function callback(err, data) {
  if (err) throw err;
  // 資料處理邏輯
});
```

這是 Node.js 常見的「Error-First Callback」風格：

- 第一個參數永遠是錯誤物件（`err`）
- 第二個才是結果（`data`）

這讓你可以清楚處理「失敗 → 中斷」、「成功 → 繼續」的邏輯。

---

## 🎯 一句話總結

> **同步保證順序但會阻塞，非同步允許彈性但需要結構管理。**

懂得何時選用哪一種，是工程師掌握程式節奏與使用者體驗的關鍵。
