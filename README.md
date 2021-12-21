# Message Board
[ ReactJS ] 留言板 [Demo Page](https://hsiaoping-zhang.github.io/ReactJS-Message-Board/)  

Time : 2020 年 7 月   
Language : `ReactJS`  
DataBase : `Firestore`  

### 功能
- 登入
- 修改密碼
- 留言版 (tester 身份可刪除 public 訊息)
- 私人留言板

### 說明
網頁提供兩種角色可以選擇：`penguin` 及 `tester`
在登入頁面可以點選圖片進入不同角色：
- `penguin`(普通使用者) 密碼為 penguin (可更改)
- `tester`(管理者) 密碼為 test (**不可更改**)

<img src="https://i.imgur.com/3bOB038.png" width="500"/>
<img src="https://i.imgur.com/wkNPBg1.png" width="500"/>


登入之後會有三個頁面可以選擇及功能：
- Public : 公共留言板
    - 所有傳送到 Public 的訊息都會在這
    - 只有 `tester` 可以刪留言
<img src="https://i.imgur.com/z5iZlWx.png" width="500"/>
 
- Message ： 私人留言板
    - tester 和 penguin 各有一個私人留言板
    - 擁有者可以已讀留言轉換訊息顏色(點一下)
    - 擁有者可以刪除留言(點兩下)
<img src="https://i.imgur.com/N6HIg4U.png" width="500"/>

- Send ： 傳送訊息到私人留言板或公告訊息到公共留言板
    - 透過 `receiver` 選單選擇訊息傳送地
<img src="https://i.imgur.com/mA0268b.png" width="500"/>
