const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
app.use(cors());
app.use(express.json());

// إنشاء قاعدة البيانات (ملف واحد محلي: reservations.db)
const db = new Database('reservations.db');

// إنشاء الجدول إذا لم يكن موجودًا
db.exec(`
  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    guests TEXT NOT NULL,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// نقطة API: إنشاء حجز جديد
app.post('/api/reservations', (req, res) => {
  const { name, phone, date, guests, notes } = req.body;

  if (!name || !phone || !date || !guests) {
    return res.status(400).json({ error: 'يرجى تعبئة جميع الحقول المطلوبة' });
  }

  const stmt = db.prepare(
    'INSERT INTO reservations (name, phone, date, guests, notes) VALUES (?, ?, ?, ?, ?)'
  );
  const result = stmt.run(name, phone, date, guests, notes || '');

  res.status(201).json({ message: 'تم حفظ الحجز بنجاح', id: result.lastInsertRowid });
});

// نقطة API: عرض جميع الحجوزات (مفيدة لاحقًا للوحة التحكم)
app.get('/api/reservations', (req, res) => {
  const rows = db.prepare('SELECT * FROM reservations ORDER BY created_at DESC').all();
  res.json(rows);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`السيرفر يعمل على http://localhost:${PORT}`);
});