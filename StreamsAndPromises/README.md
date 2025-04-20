# 📘 for await...of 與 Stream 串流 — JavaScript 處理大型資料的現代寫法

這份筆記整理了我對於 JavaScript 中 `for await...of` 搭配 Node.js 的 Stream 使用方式的理解，  
特別針對大型檔案、非同步處理、記憶體效能的實際應用。

---

## ✅ 核心理解

### 📌 什麼是 `for await...of`？

> `for await...of` 是一種 ES2018 引入的語法，可以用來逐步處理 **Async Iterable**，  
> 它在 Node.js 中非常適合拿來處理 **可讀串流（Readable Stream）**。

---

### 📌 為什麼不用 `readFile()`？

> `fs.readFile()` 是**一次性把整個檔案讀進記憶體**，對小檔案沒問題，  
> 但對大檔案來說記憶體壓力很大，也沒辦法邊讀邊處理。

> Stream 是**邊讀邊處理**的機制，節省記憶體，也更有彈性。

---

## ✅ 實作範例

\`\`\`js
import { open } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function streamFiles() {
  try {
    const readHandle = await open(\`\${__dirname}/greet.txt\`, 'r');
    const writeHandle = await open(\`\${__dirname}/greet-copy.txt\`, 'w');

    const readable = readHandle.createReadStream({
      encoding: 'utf8',
      highWaterMark: 16 * 1024,
    });
    const writable = writeHandle.createWriteStream();

    // 核心語法：逐塊讀取並寫入
    for await (const chunk of readable) {
      writable.write(chunk);
    }

    await readHandle.close();
    await writeHandle.close();
    console.log('✅ 複製完成！');
  } catch (err) {
    console.error('❌ 發生錯誤：', err);
  }
}

streamFiles();
\`\`\`

---

## ✅ 語法行為分析

### 🔁 `for await (const chunk of readable)`

- `readable` 是一個 **Async Iterable**
- 每次 `chunk` 是資料的一小塊（例如 16KB）
- 這個迴圈**會自動等到下一塊資料出現**，再繼續下一次迴圈

---

### 📤 `writable.write(chunk)`

- 把每一塊資料寫進新檔案
- 預設是同步的，但實際是寫入快取
- 若想控制 backpressure 可搭配 `stream/promises`

---

## ✅ 使用這種寫法的優點

| 優點 | 說明 |
|------|------|
| 📦 節省記憶體 | 不需要一次載入整個檔案 |
| ⛓ 邏輯清楚 | 比 `.on('data')`、`.pipe()` 更可控 |
| 🧠 像同步一樣可讀 | 程式碼更好維護與除錯 |
| 🧰 搭配 `async/await` 可統一錯誤處理 | 更方便集中 catch 錯誤 |

---

## 🔍 與其他方法比較

| 方法 | 是否分塊處理 | 是否支援同步風格 | 可控性 | 適用情境 |
|------|----------------|------------------|--------|------------|
| `fs.readFile()` | ❌ 一次全讀 | ✅ | ❌ | 小檔案 |
| `.pipe()` | ✅ 自動處理 | ❌ | ❌ | 快速簡單串接 |
| `for await...of` | ✅ 一塊一塊處理 | ✅ | ✅ | 大檔案、需控制流程時最推薦 |

---

## 🧠 一句話總結

> `for await...of` 是 JavaScript 處理大型串流資料的現代方式，  
> 提供了記憶體友善、流程清楚、非同步控制力高的優勢，  
> 是處理大型檔案與資料流的強大工具。

---

## 🎯 延伸學習建議

- `stream/promises`：更進階的 stream 控制與 backpressure 管理
- `pipeline()`：將多個 stream 組合成資料處理流程
- `Readable.from()`：從資料陣列建立自訂 Stream
- `Transform stream`：串接處理邏輯，例如壓縮、加密、轉碼

---

Happy Streaming & Control 🎧
