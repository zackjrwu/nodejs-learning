// 定義 Promise 的三種狀態
const PENDING = 0;
// 成功
const FULFILLED = 1;
// 失敗
const REJECTED = 2;

// 自定義 Promise
function CustomPromise(executor) {
    let state = PENDING;
    let value = null;
    let handlers = [];
    let catches = [];

    // 成功
    // 這會讓使用者可以決定在成功時要做什麼
    function resolve(result) {
        if (state !== PENDING) return;
        state = FULFILLED;
        value = result;
        handlers.forEach(h => h(value));
        handlers = []; // 清空 handlers
    }

    // 失敗
    // 這會讓使用者可以決定在失敗時要做什麼
    function reject(error) {
        if (state !== PENDING) return;
        state = REJECTED;
        value = error;
        catches.forEach((c) => c(error));
    }

    // 當使用者有正常使用 resolve 時，如果對 promise 有 then 的話，就會執行 then 的 callback
    this.then = function (callback) {
        return new CustomPromise((resolve) => {
            const newCallback = (val) => {
                const result = callback(val);
                resolve(result);
            };

            if (state === FULFILLED) {
                // 如果已完成，直接執行
                newCallback(value);
            } else {
                // 如果還在等待，加入隊列
                handlers.push(newCallback);
            }
        });
    }

    // 當使用者有正常使用 reject 時，如果對 promise 有 catch 的話，就會執行 catch 的 callback
    this.catch = function (callback) {
        if (state === REJECTED) {
            callback(value);
        } else {
            catches.push(callback);
        }
    }

    // 執行 executor 的 callback
    executor(resolve, reject);
}


// 測試
const promise = new CustomPromise((res, rej) => {
    setTimeout(() => {
        res('成功');
    }, 1000);
});


promise.then((value) => {
    console.log(value);
    return '成功2';
}).then((value) => {
    console.log(value);
    return '成功3';
}).then((value) => {
    console.log(value);
});