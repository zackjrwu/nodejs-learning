# Promise 實作與概念解析

這個專案展示了一個基本的 Promise 實作，並解釋了其中的關鍵概念。

## 核心概念

### 1. Promise 狀態
- PENDING（等待中）：初始狀態
- FULFILLED（已完成）：操作成功完成
- REJECTED（已拒絕）：操作失敗

### 2. Promise 的鏈式調用
Promise 的鏈式調用（例如 `.then().then()`）是通過在每個 `then` 方法中返回新的 Promise 實現的：
```javascript
this.then = function(callback) {
    return new CustomPromise((resolve) => {
        // ... 處理邏輯
    });
};
```

### 3. 處理器（Handlers）陣列
- 使用陣列儲存多個處理器的原因是支援多個獨立的監聽者
- 必須搭配 `forEach` 來通知所有監聽者
```javascript
handlers.forEach(h => h(value));
```

### 4. 狀態變更
- 狀態只能從 PENDING 改變為 FULFILLED 或 REJECTED
- 狀態改變後就不能再改變
```javascript
function resolve(result) {
    if (state !== PENDING) return;
    state = FULFILLED;
    value = result;
    handlers.forEach(h => h(value));
}
```

## 重要特性

### 1. 執行順序保證
即使有異步操作（如 setTimeout），Promise 鏈也能保證執行順序：
```javascript
promise
    .then(value => console.log(1))
    .then(value => console.log(2))
    .then(value => console.log(3));
// 一定按順序輸出：1, 2, 3
```

### 2. 值的傳遞
- 每個 `then` 的返回值會傳給下一個 `then`
- 如果沒有明確返回值，會傳遞 `undefined`
```javascript
promise
    .then(value => "新值")
    .then(value => console.log(value)); // 輸出："新值"
```

### 3. 多個監聽者
同一個 Promise 可以註冊多個獨立的處理器：
```javascript
const p = new CustomPromise(resolve => resolve('data'));
p.then(v => console.log('監聽者 1:', v));
p.then(v => console.log('監聽者 2:', v));
```

## Promise 的同步與非同步特性

### 1. 真正的非同步與同步包裝
在 Promise 鏈中，只有兩種情況會產生真正的非同步操作：
- 初始的 Promise（第一個 Promise）
- 手動創建的新 Promise

其他所有的 `then` 操作都是同步的包裝。

```javascript
const promise = new CustomPromise((res) => {
    setTimeout(() => {
        res('初始值');  // 第一個真正的非同步
    }, 1000);
});

promise
    .then(value => {
        // 同步的！只是包裝值
        return value + '（同步處理）';
    })
    .then(value => {
        // 還是同步的！
        return value + '（還是同步）';
    })
    .then(value => {
        // 只有手動返回新的 Promise 時，才會有真正的非同步
        return new CustomPromise((resolve) => {
            setTimeout(() => {
                resolve(value + '（真正的非同步）');
            }, 1000);
        });
    });
```

### 2. then 方法的同步包裝
`then` 方法返回的 Promise 主要是為了：
- 保持介面一致性
- 支援鏈式調用
- 處理值的傳遞

```javascript
this.then = function(callback) {
    return new CustomPromise((resolve) => {
        // 這個 Promise 是同步的！
        // 它只是把值包裝一下，馬上就 resolve 了
        const result = callback(value);
        resolve(result);
    });
};
```

### 3. 手動創建非同步操作
當需要真正的非同步操作時，必須手動創建新的 Promise：

```javascript
fetchUserData()  // 第一個真正的非同步
    .then(user => {  // 同步包裝
        return user.id;
    })
    .then(id => {  // 同步包裝
        return new CustomPromise((resolve) => {  // 手動創建的非同步
            fetchUserProfile(id)
                .then(profile => resolve(profile));
        });
    })
    .then(profile => {  // 同步包裝
        return profile.name;
    });
```

## 常見陷阱

1. **忘記返回值**
```javascript
// 錯誤示範
.then(value => {
    console.log(value);
    // 沒有 return，下一個 then 會收到 undefined
})

// 正確示範
.then(value => {
    console.log(value);
    return value; // 明確返回值給下一個 then
})
```

2. **沒有處理 Promise 狀態**
```javascript
// 要記得在適當時機調用 resolve 或 reject
new CustomPromise((resolve, reject) => {
    // 忘記調用 resolve 會導致 Promise 永遠停在 PENDING 狀態
});
```

## 實際應用場景

1. **非同步操作鏈**
```javascript
fetchUserData()
    .then(user => processUser(user))
    .then(processed => saveToDatabase(processed))
    .then(() => console.log('完成'));
```

2. **多個獨立監聽者**
```javascript
const userPromise = fetchUser();
userPromise.then(user => updateUI(user));
userPromise.then(user => saveToCache(user));
userPromise.then(user => analytics.log(user));
```

## 結論

Promise 的實作雖然看似簡單，但包含了許多重要的設計考量：
- 狀態管理
- 鏈式調用
- 觀察者模式
- 異步操作的順序保證
- 同步與非同步操作的巧妙結合

理解這些概念對於正確使用 Promise 和處理非同步操作至關重要。