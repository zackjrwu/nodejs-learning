# 📘 Callback 概念筆記 — JavaScript 非同步的設計關鍵

這份筆記整理了我對於 JavaScript 中 **callback（回呼函式）** 的理解，特別是它與非同步、事件驅動、程式流程控制的關聯。

---

## ✅ 核心理解

### 📌 callback 是什麼？

> callback 是一種把函式「當作參數」傳進去，等特定事件完成後再「由系統幫你執行」的程式設計模式。

### 📌 為什麼要 callback？

> 因為這個世界是非同步的，資料的取得往往不是即時完成，
> 所以我們把「資料來之後要執行的動作」包成函式傳進去，等資料準備好再執行它。

---

## ✅ 範例程式碼

```js
function greet(callback) {
  console.log('Hello');
  const data = {
    name: 'Zack Wu',
  };
  callback(data);
}

greet(function (data) {
  console.log('The callback was invoked!');
  console.log(data);
});
```

### 🔍 分析：

- `greet()` 代表主流程（模擬 API 拿資料）
- `callback(data)` 模擬資料回來以後的處理邏輯
- 傳進去的匿名函式就是我們的 **callback handler**
- `data` 是 `greet()` 傳給 callback 的資料，不是 callback 自己去外面抓的

這就是 callback 常見在非同步邏輯中的角色：

> **等資料來 → 呼叫 callback 處理資料**

---

## ✅ JavaScript 的特性：為何 callback 可行？

> JavaScript 支援 **First-Class Functions（一級公民函式）**，所以函式可以被：
>
> - 存進變數
> - 當參數傳入其他函式
> - 當作值被傳遞與呼叫

這讓我們可以把一段邏輯「交給別人，等時間點對了再執行」，這就是 callback 的本質。

---

## ✅ callback 與資料的關係

### 📌 callback 中的 `data` 是哪來的？

是 **由主函式主動傳入的參數**：

```js
callback(data);
```

callback 並不是自己去偷 scope 裡的變數，而是透過 function parameter 被餵進來的。

---

## 🧠 一句話總結

> JavaScript 的 callback 讓我們可以把「行為」抽離出來，
> 在非同步完成的那一刻，透過參數取得資料，然後做該做的事情。

這是非同步世界中最簡單、最原始、也最強大的模式。

---

## 🎯 延伸學習建議

- `setTimeout(callback, delay)` — 模擬延遲觸發
- `fs.readFile(path, callback)` — Node.js 非同步檔案讀取
- `fetch(...).then(...)` — Promise 是 callback 的進化
- `async/await` — 讓非同步更像同步，但底層仍是 callback

---

Happy Async Thinking ☕
