// buffer-demo.js

const buf = Buffer.from('Hello', 'utf-8');
// 建立一個 Buffer，內容是字串 'Hello' 的 UTF-8 編碼

console.log(buf);
/*
  輸出：<Buffer 48 65 6c 6c 6f>
  這是 'Hello' 每個字元的 UTF-8 十六進位表示：
  H → 0x48
  e → 0x65
  l → 0x6c
  o → 0x6f

  在 Node.js 中，console.log 印出 Buffer 物件時，會顯示為十六進位格式，
  這樣更方便開發者觀察原始資料內容，特別是在處理圖片、音訊或網路封包等場景。
*/

console.log(buf.toString());
// 將 Buffer 還原為原本的字串，輸出：'Hello'

console.log(buf.toJSON());
/*
  輸出：{ type: 'Buffer', data: [ 72, 101, 108, 108, 111 ] }
  每個數字代表對應字元的 UTF-8 十進位數值。
*/

console.log(buf[2]);
/*
  輸出：108
  buf[2] 是第三個 byte，也就是字元 'l'
  顯示為十進位格式的 byte 數值（0x6c = 108）
*/

buf.write('wo');
// 將 'wo' 的 UTF-8 byte 寫入 Buffer 的開頭位置（會覆蓋原本的 H 和 e）

console.log(buf.toString());
// 輸出：'wollo'
// 因為原本是 'Hello'，現在前兩個 byte 被 'wo' 覆蓋，變成 'wollo'
