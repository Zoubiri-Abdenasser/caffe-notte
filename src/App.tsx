import { useState } from 'react'
import './App.css'

type Tab = 'coffee' | 'pastries' | 'specials'

const menuData: Record<Tab, { name: string; desc: string; price: string }[]> = {
  coffee: [
    { name: 'إسبريسو دوبيو', desc: 'حبوب إيطالية محمّصة طازجة، تقدّم في كوب صغير', price: '14 ر.س' },
    { name: 'كابتشينو', desc: 'إسبريسو مع حليب مخفوق ورغوة كريمية كثيفة', price: '18 ر.س' },
    { name: 'فلات وايت', desc: 'إسبريسو مزدوج مع حليب مخملي ناعم', price: '20 ر.س' },
    { name: 'أفوكاتو', desc: 'إسبريسو ساخن يُسكب فوق آيس كريم الفانيليا', price: '24 ر.س' },
  ],
  pastries: [
    { name: 'كرواسون بالزبدة', desc: 'مخبوز طازج يوميًا بطبقات مقرمشة', price: '12 ر.س' },
    { name: 'تيراميسو', desc: 'حلى إيطالي كلاسيكي بالماسكاربوني والقهوة', price: '26 ر.س' },
    { name: 'كانولي صقلّي', desc: 'محشو بكريمة الريكوتا والشوكولاتة', price: '16 ر.س' },
    { name: 'فوكاتشا بالزعتر', desc: 'خبز إيطالي بزيت الزيتون والأعشاب', price: '15 ر.س' },
  ],
  specials: [
    { name: 'نوتّي لاتيه', desc: 'مزيج خاص بالبندق والكراميل المملح', price: '22 ر.س' },
    { name: 'موكا الليل', desc: 'إسبريسو، شوكولاتة داكنة، ولمسة فانيليا', price: '23 ر.س' },
    { name: 'كولد برو نيون', desc: 'قهوة مثلجة بتخمير بارد لمدة 18 ساعة', price: '19 ر.س' },
  ],
}

const tabLabels: Record<Tab, string> = {
  coffee: 'القهوة',
  pastries: 'المخبوزات',
  specials: 'مختارات الليل',
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('coffee')
  const [formMsg, setFormMsg] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormMsg('تم استلام طلبك! سنؤكد الحجز قريبًا.')
  }

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-logo">Caffè <span>Notte</span></div>
        <ul>
          <li><a href="#about">من نحن</a></li>
          <li><a href="#menu">القائمة</a></li>
          <li><a href="#reviews">آراء الزوار</a></li>
          <li><a href="#contact">تواصل</a></li>
        </ul>
      </nav>

      <section className="hero">
        <span className="hero-eyebrow">مقهى إيطالي · أجواء ليلية</span>
        <h1 className="neon-sign">Caffè Notte</h1>
        <h2>حيث تلتقي القهوة الإيطالية بسحر الليل</h2>
        <p>تجربة قهوة عصرية بروح إيطالية أصيلة، في فضاء هادئ تتراقص فيه أضواء النيون مع رائحة الإسبريسو الطازج.</p>
        <div className="btn-row">
          <a href="#contact" className="btn btn-neon">احجز طاولتك</a>
          <a href="#menu" className="btn btn-outline">تصفح القائمة</a>
        </div>
      </section>

      <section id="about">
        <div className="about-grid">
          <div className="about-card">☕</div>
          <div className="about-text">
            <div className="section-eyebrow">حكايتنا</div>
            <h2 style={{ marginBottom: 20 }}>وُلدنا من شغف إيطالي بالليل</h2>
            <p>Caffè Notte بدأ كفكرة بسيطة: مكان يجمع بين دقة تحضير القهوة الإيطالية التقليدية وأجواء عصرية تناسب ساعات المساء.</p>
            <p>كل كوب يُحضّر بعناية من حبوب مختارة، وكل زاوية بالمقهى صُممت لتشعرك بالراحة وسط أضواء هادئة وموسيقى ناعمة.</p>
            <div className="about-stats">
              <div className="stat"><strong>100%</strong><span>حبوب إيطالية أصلية</span></div>
              <div className="stat"><strong>16</strong><span>ساعة عمل يوميًا</span></div>
              <div className="stat"><strong>5000+</strong><span>كوب يُقدّم شهريًا</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu">
        <div className="section-head">
          <div className="section-eyebrow">القائمة</div>
          <h2>نكهات تُحضّر بشغف</h2>
          <p>من الإسبريسو الكلاسيكي إلى مختاراتنا الليلية الخاصة</p>
        </div>
        <div className="menu-tabs">
          {(Object.keys(menuData) as Tab[]).map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {menuData[activeTab].map((item) => (
            <div className="menu-item" key={item.name}>
              <div>
                <div className="menu-item-name">{item.name}</div>
                <div className="menu-item-desc">{item.desc}</div>
              </div>
              <div className="menu-item-price">{item.price}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="quote-section">
        <p className="quote">"القهوة الجيدة لا تحتاج ضوء النهار لتُقدَّر — أحيانًا تكون أجمل تحت أضواء الليل الهادئة."</p>
        <p className="quote-by">— مؤسس Caffè Notte</p>
      </section>

      <section id="reviews">
        <div className="section-head">
          <div className="section-eyebrow">آراء زوارنا</div>
          <h2>تجارب من قلب المقهى</h2>
        </div>
        <div className="review-grid">
          <div className="review-card">
            <div style={{ color: 'var(--amber)' }}>★★★★★</div>
            <p>أجواء المقهى ليلًا لا توصف، والقهوة بمستوى عالمي. أصبح مكاني المفضل للعمل مساءً.</p>
            <div className="review-name">ريم العنزي</div>
            <div className="review-role">مصممة جرافيك</div>
          </div>
          <div className="review-card">
            <div style={{ color: 'var(--amber)' }}>★★★★★</div>
            <p>التيراميسو هنا أفضل من اللي جربته بإيطاليا نفسها! تجربة استثنائية بكل التفاصيل.</p>
            <div className="review-name">فهد الدوسري</div>
            <div className="review-role">زائر دائم</div>
          </div>
          <div className="review-card">
            <div style={{ color: 'var(--amber)' }}>★★★★★</div>
            <p>الإضاءة والموسيقى والقهوة كل شي متناسق. مكان مثالي لقضاء سهرة هادئة مع الأصدقاء.</p>
            <div className="review-name">لينا الشهري</div>
            <div className="review-role">مدونة طعام</div>
          </div>
        </div>
      </section>

      <section id="contact" style={{ background: 'var(--surface-2)' }}>
        <div className="contact-wrap">
          <div>
            <div className="section-eyebrow">تواصل معنا</div>
            <h2 style={{ marginBottom: 20 }}>احجز طاولتك الليلية</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 36, lineHeight: 1.8 }}>
              نفتح أبوابنا حتى ساعات متأخرة من الليل، تعال واستمتع بفنجان قهوة حقيقي.
            </p>
            <ul className="info-list">
              <li><span className="icon">📍</span><div><strong>الموقع</strong><span>شارع الأمير سلطان، جدة</span></div></li>
              <li><span className="icon">⏰</span><div><strong>أوقات العمل</strong><span>يوميًا من 4 عصرًا حتى 2 فجرًا</span></div></li>
              <li><span className="icon">📞</span><div><strong>للحجز</strong><span>0566 789 123</span></div></li>
            </ul>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" placeholder="الاسم الكامل" required />
              <input type="tel" placeholder="رقم الجوال" required />
            </div>
            <div className="form-row">
              <input type="date" required />
              <select required defaultValue="">
                <option value="" disabled>عدد الأفراد</option>
                <option>1-2</option>
                <option>3-4</option>
                <option>5+</option>
              </select>
            </div>
            <textarea placeholder="ملاحظات إضافية (اختياري)" />
            <button type="submit" className="submit-btn">تأكيد الحجز</button>
            <div className="form-msg">{formMsg}</div>
          </form>
        </div>
      </section>

      <footer>
        <div className="nav-logo">Caffè <span>Notte</span></div>
        <p>© 2026 Caffè Notte. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  )
}

export default App