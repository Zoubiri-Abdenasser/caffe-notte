import { useEffect, useState } from 'react'

interface Reservation {
  id: number
  name: string
  phone: string
  date: string
  guests: string
  notes: string
  created_at: string
}

const ADMIN_PASSWORD = 'notte2026'

function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [authError, setAuthError] = useState('')

  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authed) return
    fetch('https://caffe-notte-api.onrender.com/api/reservations')
      .then((res) => res.json())
      .then((data) => {
        setReservations(data)
        setLoading(false)
      })
      .catch(() => {
        setError('تعذر الاتصال بالسيرفر. تأكد إنه يعمل على localhost:4000')
        setLoading(false)
      })
  }, [authed])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthed(true)
      setAuthError('')
    } else {
      setAuthError('كلمة المرور غير صحيحة')
    }
  }

  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0E0B09', color: '#F2E9DD',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Manrope, sans-serif', padding: 20,
      }}>
        <form onSubmit={handleLogin} style={{
          background: '#1B1410', padding: '40px 36px', borderRadius: 8,
          border: '1px solid rgba(242,233,221,0.1)', width: 320, textAlign: 'center',
        }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: '#4DFFD2', marginBottom: 20 }}>
            دخول الإدارة
          </h2>
          <input
            type="password"
            placeholder="كلمة المرور"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 4, marginBottom: 14,
              background: '#241B15', border: '1px solid rgba(242,233,221,0.15)', color: '#F2E9DD',
            }}
            autoFocus
          />
          <button type="submit" style={{
            width: '100%', padding: 12, borderRadius: 4, background: '#4DFFD2',
            color: '#0E0B09', fontWeight: 700, border: 'none', cursor: 'pointer',
          }}>
            دخول
          </button>
          {authError && <p style={{ color: '#FFB23F', marginTop: 14, fontSize: '.85rem' }}>{authError}</p>}
        </form>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0E0B09', color: '#F2E9DD', padding: '40px 6%', fontFamily: 'Manrope, sans-serif' }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: '#4DFFD2', marginBottom: 8 }}>
        لوحة تحكم الحجوزات
      </h1>
      <p style={{ color: '#9C8F82', marginBottom: 30 }}>Caffè Notte — جميع الحجوزات المسجلة</p>

      {loading && <p>جاري التحميل...</p>}
      {error && <p style={{ color: '#FFB23F' }}>{error}</p>}

      {!loading && !error && reservations.length === 0 && (
        <p style={{ color: '#9C8F82' }}>لا توجد حجوزات حتى الآن.</p>
      )}

      {!loading && reservations.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #4DFFD2', textAlign: 'right' }}>
                <th style={{ padding: '12px 10px' }}>#</th>
                <th style={{ padding: '12px 10px' }}>الاسم</th>
                <th style={{ padding: '12px 10px' }}>الجوال</th>
                <th style={{ padding: '12px 10px' }}>التاريخ</th>
                <th style={{ padding: '12px 10px' }}>الأفراد</th>
                <th style={{ padding: '12px 10px' }}>ملاحظات</th>
                <th style={{ padding: '12px 10px' }}>وقت التسجيل</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid rgba(242,233,221,0.08)' }}>
                  <td style={{ padding: '12px 10px' }}>{r.id}</td>
                  <td style={{ padding: '12px 10px' }}>{r.name}</td>
                  <td style={{ padding: '12px 10px' }}>{r.phone}</td>
                  <td style={{ padding: '12px 10px' }}>{r.date}</td>
                  <td style={{ padding: '12px 10px' }}>{r.guests}</td>
                  <td style={{ padding: '12px 10px', color: '#9C8F82' }}>{r.notes || '—'}</td>
                  <td style={{ padding: '12px 10px', color: '#9C8F82' }}>{r.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminPage