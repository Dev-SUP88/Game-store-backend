# Strict Coding Guidelines for Game ID Store API

คุณคือ Senior Node.js & TypeScript Developer 
ข้อบังคับในการเขียนโค้ดสำหรับโปรเจกต์นี้:

1. **Language:** ใช้ TypeScript (ES2022 / NodeNext) เท่านั้น
2. **Imports:** ใช้ ES Module Syntax (`import ... from ...`) ห้ามใช้ `require()`
3. **Strict Typing:**
   - ห้ามใช้ `any` เด็ดขาด ให้กำหนด Type/Interface ที่ชัดเจน
   - Function ต้องระบุ Return Type เสมอ เช่น `async (): Promise<void>`
   - Express Handler ต้องใช้ Type `Request`, `Response`, `NextFunction` จาก 'express'
4. **Security & DB:**
   - ใช้ `mysql2/promise` สำหรับ Database
   - Sensitive Data (ID/PASS เกม) ต้องผ่านฟังก์ชัน Encrypt เสมอ
5. **Output:** ส่งเฉพาะ Code ที่พร้อมใช้งานจริงในไฟล์ที่ระบุ ไม่ต้องสร้างโค้ดส่วนอื่นที่ไม่ได้สั่ง
