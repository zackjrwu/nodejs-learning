const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// 實作說明：
// 本範例展示 Node.js streams 中 pipe() 方法的基本用法，
// 包含文件讀寫、壓縮和解壓縮等功能。

// 定義檔案路徑
const storyFile = path.join(__dirname, 'story.txt');
const copiedFile = path.join(__dirname, 'story-piped-copy.txt');
const compressedFile = path.join(__dirname, 'story.txt.gz');
const decompressedFile = path.join(__dirname, 'story-decompressed.txt');

// 1. 基本的 pipe 操作：直接從可讀串流輸出到可寫串流
console.log('示例 1: 基本文件 pipe 操作');
console.log(`從 ${storyFile} 讀取並寫入到 ${copiedFile}`);

const readableStream = fs.createReadStream(storyFile, {
  encoding: 'utf8'
});

const writableStream = fs.createWriteStream(copiedFile);

// 使用 pipe 連接讀取串流和寫入串流
// 這比手動監聽 'data' 事件並調用 write() 更簡潔
readableStream.pipe(writableStream)
  .on('finish', () => {
    console.log('文件拷貝完成！');
    console.log('----------------------------');
    
    // 在第一個 pipe 操作完成後執行示例 2
    compressExample();
  })
  .on('error', (err) => {
    console.error('文件拷貝過程中發生錯誤:', err);
  });

// 2. 壓縮文件的 pipe 操作
function compressExample() {
  console.log('示例 2: 文件壓縮');
  console.log(`壓縮 ${storyFile} 到 ${compressedFile}`);
  
  const sourceStream = fs.createReadStream(storyFile);
  const gzipStream = zlib.createGzip();
  const destinationStream = fs.createWriteStream(compressedFile);
  
  // 使用 pipe 鏈式操作: 讀取 -> 壓縮 -> 寫入
  sourceStream
    .pipe(gzipStream)
    .pipe(destinationStream)
    .on('finish', () => {
      console.log('文件壓縮完成！');
      
      // 獲取原始文件和壓縮文件的大小以顯示壓縮率
      const originalSize = fs.statSync(storyFile).size;
      const compressedSize = fs.statSync(compressedFile).size;
      const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
      
      console.log(`原始文件大小: ${originalSize} 字節`);
      console.log(`壓縮文件大小: ${compressedSize} 字節`);
      console.log(`壓縮率: ${compressionRatio}%`);
      console.log('----------------------------');
      
      // 壓縮完成後執行示例 3
      decompressExample();
    })
    .on('error', (err) => {
      console.error('壓縮過程中發生錯誤:', err);
    });
}

// 3. 解壓縮文件的 pipe 操作
function decompressExample() {
  console.log('示例 3: 文件解壓縮');
  console.log(`解壓縮 ${compressedFile} 到 ${decompressedFile}`);
  
  const sourceStream = fs.createReadStream(compressedFile);
  const gunzipStream = zlib.createGunzip();
  const destinationStream = fs.createWriteStream(decompressedFile);
  
  // 使用 pipe 鏈式操作: 讀取 -> 解壓縮 -> 寫入
  sourceStream
    .pipe(gunzipStream)
    .pipe(destinationStream)
    .on('finish', () => {
      console.log('文件解壓縮完成！');
      
      // 驗證解壓縮後的文件與原始文件是否一致
      const originalContent = fs.readFileSync(storyFile, 'utf8');
      const decompressedContent = fs.readFileSync(decompressedFile, 'utf8');
      const isContentIdentical = originalContent === decompressedContent;
      
      console.log(`解壓縮前後文件內容一致: ${isContentIdentical ? '是' : '否'}`);
      console.log('----------------------------');
      console.log('所有操作完成！');
    })
    .on('error', (err) => {
      console.error('解壓縮過程中發生錯誤:', err);
    });
}

// 錯誤處理：全局非捕獲異常處理
process.on('uncaughtException', (err) => {
  console.error('發生未捕獲的異常:', err);
  process.exit(1);
});

console.log('開始執行串流操作...');
console.log('----------------------------');

