# Bot Auto Bid https://www.chilindo.com/

## Installation
```bash
git clone https://github.com/zokemoke/bid-chilindo.git
cd bid-chilindo
npm install
npm start
```

## Config
แก้ไขไฟล์ .env
1.เพิ่ม USERNAME & PASSWORD ที่ไว้เข้าใช้งาน https://www.chilindo.com/

2.HEADLESS = {"headless": false}
แกไข HEADLESS ให้โปรแกรมเปิด browser ขึ้นมาโชว์การทำงานตรง false
true คือไม่เปิด browser
false คือเปิด browser

3.RUN_NOLOOP แปลตามตัวครับอ่าน code ดูละกันห้าๆ

## Add Item bid
แก้ไขไฟล์ /config/config.json

"item_2": {
    //ใส่ชื่อขอที่ประมูล
    "name": "เตาหมูทะ",
    //url ของสิ้นค้าที่ต้องการประมูล ลองเข้าไปกดดูในเว็บหลัง /product/50-491V1 จะมีรหัสแบบนี้เอามาใส่นะ
    "url": "https://www.chilindo.com/th/product/50-491V1",
    //ราคาสูงสุดที่จะประมูล ระบบจะเคาะไปที่ละครั้ง จนกว่าจะถึงราคาที่เราต้องไว้ก็จะไม่เคาะต่อ
    "price": 101,
    //หน่วงเวลาที่จะเข้าไปเคาะครั้งต่อไป หน่วยเป็นนาที
    "loop_time": 2.8
}

# Log
log ข้อมูลการ bid เปิดดูได้ที่ /logs/(date)/test.log
ตัวอย่าง
```bash
2019-12-22 00:43:30 INFO  name^ไฟติดเสา|item-price^51|bid-price^21|action^first exit 
2019-12-22 00:44:12 INFO  name^ไฟติดเสา|item-price^1|bid-price^21|action^bid 
2019-12-22 08:40:26 INFO  name^เตาหมูทะ|item-price^481|bid-price^101|action^first exit 
2019-12-22 08:41:08 INFO  name^เตาหมูทะ|item-price^1|bid-price^101|action^bid 
2019-12-22 16:10:30 INFO  name^SKG หม้อหุงข้าว|item-price^1|bid-price^51|action^bid 
2019-12-22 16:10:32 INFO  name^เครื่องเป่าลมไฟฟ้า|item-price^121|bid-price^51|action^last exit 
2019-12-22 16:10:32 INFO  name^เตาหมูทะ|item-price^81|bid-price^101|action^bid 
2019-12-22 16:10:32 INFO  name^เครื่องดูดฝุ่นในรถยนต์|item-price^51|bid-price^51|action^bid 
2019-12-22 16:10:33 INFO  name^อบขนมปัง|item-price^61|bid-price^101|action^bid 
```

## Bug
บางครั้งระบบมันไม่กด bid ให้ใครรู้ต้องทำยังไง issues มาให้หน่อยนะครับ
