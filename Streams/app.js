const fs = require('fs');

// 預設每個 chunk 為 64KB
const defaultChunkSize = 64 * 1024; // 64KB
let chunkCount = 0;
let totalChunkSize = 0;
let currentChunkSize = 0;

// 建立可讀串流
const readable = fs.createReadStream('./story.txt', {
  encoding: 'utf8',
  // highWaterMark: 1 * 1024 // 可自訂 chunk 大小
});

console.log('Default chunk size:', defaultChunkSize);

// 每次讀到資料時的 callback
const onChunk = (chunk) => {
  chunkCount++;
  currentChunkSize = Buffer.byteLength(chunk);
  totalChunkSize += currentChunkSize;

  console.log('Current chunk size:', currentChunkSize);
  console.log('Total chunk size  :', totalChunkSize);
  console.log('----------------------------');
};

// 結束讀取時的 callback
const onEnd = () => {
  console.log('End of file reading.');
  console.log('Total chunks read   :', chunkCount);
  console.log('Total chunk size    :', totalChunkSize);
  console.log('Last chunk size     :', currentChunkSize);
  console.log('----------------------------');
};

// 註冊事件
readable.on('data', onChunk);
readable.on('end', onEnd);
