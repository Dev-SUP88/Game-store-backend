import { customType } from 'drizzle-orm/mysql-core';
import { parse as uuidParse, stringify as uuidStringify } from 'uuid';

export const binaryUuid = customType<{ data: string; driverData: Buffer }>({
  dataType() {
    return 'binary(16)';
  },
  toDriver(value: string): Buffer {
    // ขาไปลง DB: รับ UUID String -> แปลงเป็น Buffer 16 ไบต์ให้
    return Buffer.from(uuidParse(value));
  },
  fromDriver(value: unknown): string {
    // ขากลับจาก DB: ไม่ว่า Driver จะส่งอะไรมา ให้แปลงกลับเป็น Buffer 16 ไบต์ที่ถูกต้อง
    if (Buffer.isBuffer(value)) {
      return uuidStringify(value);
    }
    if (typeof value === 'string') {
      // ดึงไบต์ดิบจาก string ด้วย encoding 'latin1' เพื่อไม่ให้บิตเพี้ยน
      const buf = Buffer.from(value, 'latin1');
      return uuidStringify(buf);
    }
    throw new Error('Could not parse binary UUID from database');
  },
});
