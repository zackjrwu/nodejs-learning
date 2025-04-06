const buf = Buffer.from('Hello', 'utf-8');
// 建立一個 buffer，內容是 Hello 的 UTF-8 編碼

console.log(buf);
/*
   <Buffer 48 65 6c 6c 6f> → 也就是 H e l l o 的 byte 值
   因為 Buffer 物件在 Node.js 裡的 console.log
   預設就是把整體 buffer 用十六進位格式印出來：
   這樣我們開發者可以更直覺看到「資料的位元組內容」，
   畢竟處理資料流（如圖片、音訊、網路封包）時通常都以十六進位來看。
*/

console.log(buf.toString());
// 'Hello' → 還原為字串

console.log(buf.toJSON());
// { type: 'Buffer', data: [ 72, 101, 108, 108, 111 ] }

console.log(buf[2]);
/*
  108 → buffer 的第 3 個 byte 是 'l'
  console.log() 印出的是「十進位」的數值。
  而 0x6c 是十六進位，它的十進位就是 108。
*/

buf.write('wo');
// 將 'wo' 的 byte 覆蓋寫進 buffer 開頭

console.log(buf.toString());
// 'wollo' → 被寫進 'wo' 後，原來的 'llo' 還在
