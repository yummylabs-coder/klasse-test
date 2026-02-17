import { useState } from 'react'
import { useAdminConfig } from '../admin/AdminConfigContext'

const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.26c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
    <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
  </svg>
)

const KlasseLogo = () => (
  <svg width="41" height="44" viewBox="0 0 41 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 34.5462V40.3678C0 41.2558 0.718783 41.9763 1.6068 41.9783L15.4671 42.0106C16.3569 42.0127 17.0797 41.2929 17.0814 40.4031L17.0955 33.0198V25.9221V19.664V10.4548V3.11055C17.0955 2.22107 16.3744 1.5 15.4849 1.5H1.61055C0.721067 1.5 0 2.22107 0 3.11055V8.9284C0 9.7714 0.683385 10.4548 1.52638 10.4548C2.93138 10.4548 4.07036 11.5938 4.07036 12.9988V30.4758C4.07036 31.8808 2.93138 33.0198 1.52638 33.0198C0.683385 33.0198 0 33.7032 0 34.5462Z" fill="white"/>
    <path d="M26.3844 40.7337C29.1481 42.1612 32.1838 42.9495 35.4915 43.0989C36.1888 43.1304 36.8079 42.6754 37.0233 42.0115L39.6671 33.861C40.0047 32.8205 39.2213 31.7608 38.1472 31.5536C36.218 31.1815 34.6291 30.2899 33.3803 28.8788C31.6843 26.9454 30.8363 24.2742 30.8363 20.8653C30.8363 19.1354 31.1501 17.4564 31.7776 15.8282C32.4051 14.1831 33.2616 12.8518 34.347 11.8342C34.7919 11.4303 35.2534 11.108 35.7315 10.8671C36.7329 10.3626 37.5465 9.21603 37.1577 8.16431L34.5187 1.02481C34.2849 0.392499 33.6817 -0.0338304 33.0085 0.00244268C29.4517 0.194106 26.3818 1.31072 23.7989 3.3523C20.9661 5.58472 18.7165 7.98399 17.2179 11.3508C15.7194 14.7541 16.1322 18.0415 16.1322 21.9083C16.1322 26.5384 17.0565 30.4391 18.9051 33.6106C20.7707 36.7821 23.2638 39.1565 26.3844 40.7337Z" fill="#F1FF53"/>
  </svg>
)

const CourseCard = ({ title, instructor, lessons, price, badge, emoji, gradient, dotGradient, image }) => (
  <div className="shrink-0 w-[200px] rounded-lg overflow-hidden border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]"
    style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)' }}>
    {/* Card image area */}
    <div className="h-[100px] relative overflow-hidden" style={{ background: gradient }}>
      {image ? (
        <img src={image} alt={title} className="w-full h-full object-cover" />
      ) : emoji ? (
        <div className="absolute inset-0 flex items-center justify-center opacity-50">
          <span className="text-[32px]">{emoji}</span>
        </div>
      ) : null}
      {badge && (
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold text-white uppercase tracking-wider"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
          {badge}
        </div>
      )}
    </div>
    {/* Card content */}
    <div className="p-3">
      <p className="text-[12px] font-bold text-white/90 leading-[1.3] mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
        {title}
      </p>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-medium text-white/40" style={{ fontFamily: '"DM Sans", sans-serif' }}>{lessons}</span>
        <span className="text-[11px] font-bold" style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          color: price === 'Free' ? '#6ee7b7' : 'rgba(255,255,255,0.65)'
        }}>{price}</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-md shrink-0" style={{ background: dotGradient }} />
        <span className="text-[10px] text-white/35" style={{ fontFamily: '"DM Sans", sans-serif' }}>by {instructor}</span>
      </div>
    </div>
  </div>
)

export default function Signup() {
  const { config } = useAdminConfig()
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Signup submitted:', formData)
  }

  const c = config.colors
  const t = config.typography
  const content = config.content
  const layout = config.layout
  const radius = `${layout.borderRadius}px`

  const brandFont = `'${t.brandFont}', system-ui, sans-serif`
  const bodyFont = `'${t.bodyFont}', system-ui, sans-serif`
  const inputFont = `'${t.inputFont}', system-ui, sans-serif`

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: bodyFont, backgroundColor: c.brandCanvas }}>
      {/* Browser Chrome Bar */}
      {layout.showBrowserChrome && (
        <div className="bg-[#F5F5F3] border-b border-[#EDEDED] px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.borderDefault }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.borderDefault }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.borderDefault }} />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-text-tertiary text-sm">klasse.io/signup</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col lg:flex-row p-4 md:p-5 gap-4 md:gap-5"
        style={{ flexDirection: layout.brandPanelPosition === 'right' ? undefined : undefined }}
      >
        {/* Branding Side */}
        <div
          className={`flex-1 rounded-xl md:rounded-2xl p-8 md:p-16 flex flex-col items-center justify-center relative overflow-hidden min-h-[500px] md:min-h-0 ${
            layout.brandPanelPosition === 'right' ? 'lg:order-2' : 'lg:order-1'
          }`}
          style={{ backgroundColor: c.brandInk }}
        >
          {/* Radial gradient decorations */}
          <div className="absolute -right-[120px] -top-[120px] w-[400px] h-[400px] rounded-[200px] pointer-events-none"
            style={{ background: `radial-gradient(circle, rgba(34,22,255,0.15) 0%, rgba(34,22,255,0) 70%)` }} />
          <div className="absolute -left-[80px] -bottom-[80px] w-[300px] h-[300px] rounded-[150px] pointer-events-none"
            style={{ background: `radial-gradient(circle, rgba(245,142,57,0.1) 0%, rgba(245,142,57,0) 70%)` }} />

          {/* Content container */}
          <div className="flex flex-col items-center justify-center flex-1 max-w-[474px] w-full relative z-10 pb-16">
            {/* Logo */}
            <div className="flex items-center justify-center mb-[-64px] z-20">
              <div className="w-16 h-16 flex items-center justify-center overflow-hidden px-1.5 py-2"
                style={{ backgroundColor: c.actionPrimary }}>
                <KlasseLogo />
              </div>
            </div>

            {/* Headline */}
            <div className="flex flex-col items-center justify-center flex-1 gap-5 mb-[-64px] z-10 text-center">
              <h1
                className="leading-[1.15] tracking-[-0.36px]"
                style={{
                  fontFamily: brandFont,
                  fontSize: `${t.headlineSize}px`,
                  fontWeight: t.headlineWeight,
                  color: c.textOnDark,
                }}
              >
                {content.headlineLine1}<br />
                {content.headlineLine2}{' '}
                <em style={{ color: c.accentOrange, fontStyle: 'italic' }}>{content.headlineAccent}</em>.
              </h1>
              <p
                className="text-center leading-[1.3] max-w-[474px]"
                style={{
                  fontFamily: bodyFont,
                  fontSize: `${t.bodySize}px`,
                  color: c.textOnDark,
                }}
              >
                {content.subheadline}
              </p>
            </div>
          </div>

          {/* Course Cards Row - scrolling at bottom */}
          {layout.showCourseCards && (
            <div className="absolute bottom-0 left-0 right-0 opacity-[0.38]">
              <div className="flex gap-[19px] items-center px-4 pb-4"
                style={{ transform: 'translateX(-40%)' }}>
                {config.cards.filter(card => card.visible).map((card, i) => (
                  <CourseCard key={i} {...card} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Signup Form Side */}
        <div className={`flex-1 flex items-center justify-center p-6 md:p-16 ${
          layout.brandPanelPosition === 'right' ? 'lg:order-1' : 'lg:order-2'
        }`}>
          <div className="w-full max-w-[380px]">
            {/* Form Header */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="text-center">
                <h2
                  className="font-bold leading-[1.25]"
                  style={{
                    fontFamily: brandFont,
                    fontSize: `${t.formTitleSize}px`,
                    color: c.textPrimary,
                  }}
                >
                  {content.formTitle}
                </h2>
              </div>
              <div className="text-center">
                <p
                  className="leading-[1.3]"
                  style={{
                    fontFamily: bodyFont,
                    fontSize: `${t.bodySize}px`,
                    color: '#878784',
                  }}
                >
                  {content.formSubtitle}
                </p>
              </div>
            </div>

            {/* Google Sign Up */}
            {layout.showGoogleButton && (
              <button
                className="w-full flex items-center justify-center gap-2 h-[42px] border bg-white hover:bg-bg-hover transition-colors"
                style={{ borderColor: c.borderDefault, borderRadius: radius }}
              >
                <GoogleIcon />
                <span className="text-[14px] font-semibold" style={{ fontFamily: brandFont, color: c.textPrimary }}>
                  {content.googleButtonText}
                </span>
              </button>
            )}

            {/* Divider */}
            {layout.showDivider && (
              <div className="flex items-center gap-3 pt-4">
                <div className="flex-1 h-px" style={{ backgroundColor: '#D0D0CB' }} />
                <span className="text-[12px] font-medium" style={{ fontFamily: bodyFont, color: '#D0D0CB' }}>
                  {content.dividerText}
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: '#D0D0CB' }} />
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold" style={{ fontFamily: inputFont, color: c.textPrimary }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full h-[40px] px-[13px] border bg-white text-[13px] focus:outline-none focus:ring-2 transition-all"
                  style={{
                    fontFamily: inputFont,
                    borderColor: c.borderDefault,
                    borderRadius: radius,
                    color: c.textPrimary,
                    '--tw-ring-color': `${c.borderFocus}33`,
                  }}
                  onFocus={e => e.target.style.borderColor = c.borderFocus}
                  onBlur={e => e.target.style.borderColor = c.borderDefault}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold" style={{ fontFamily: inputFont, color: c.textPrimary }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full h-[40px] px-[13px] border bg-white text-[13px] focus:outline-none focus:ring-2 transition-all"
                  style={{
                    fontFamily: inputFont,
                    borderColor: c.borderDefault,
                    borderRadius: radius,
                    color: c.textPrimary,
                    '--tw-ring-color': `${c.borderFocus}33`,
                  }}
                  onFocus={e => e.target.style.borderColor = c.borderFocus}
                  onBlur={e => e.target.style.borderColor = c.borderDefault}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold" style={{ fontFamily: inputFont, color: c.textPrimary }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 8 characters"
                  className="w-full h-[40px] px-[13px] border bg-white text-[13px] focus:outline-none focus:ring-2 transition-all"
                  style={{
                    fontFamily: inputFont,
                    borderColor: c.borderDefault,
                    borderRadius: radius,
                    color: c.textPrimary,
                    '--tw-ring-color': `${c.borderFocus}33`,
                  }}
                  onFocus={e => e.target.style.borderColor = c.borderFocus}
                  onBlur={e => e.target.style.borderColor = c.borderDefault}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-[48px] font-semibold text-[14px] transition-colors"
                style={{
                  fontFamily: brandFont,
                  backgroundColor: c.actionPrimary,
                  color: 'white',
                  borderRadius: radius,
                }}
                onMouseEnter={e => e.target.style.backgroundColor = c.actionPrimaryHover}
                onMouseLeave={e => e.target.style.backgroundColor = c.actionPrimary}
              >
                {content.submitButtonText}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="flex items-center justify-center gap-1 mt-4">
              <span className="text-[13px]" style={{ fontFamily: bodyFont, color: '#64645F' }}>
                {content.signinPrompt}
              </span>
              <a href="/signin" className="text-[13px] font-bold no-underline" style={{ fontFamily: bodyFont, color: c.actionPrimary }}>
                {content.signinLinkText}
              </a>
            </div>

            {/* Terms */}
            {layout.showTerms && (
              <p className="text-center mt-4 text-[11px] tracking-[0.66px]" style={{ fontFamily: bodyFont, color: '#ABABAA' }}>
                By creating an account, you agree to our{' '}
                <a href="/terms" className="no-underline" style={{ color: '#64645F' }}>Terms</a>
                {' '}and{' '}
                <a href="/privacy" className="no-underline" style={{ color: '#64645F' }}>Privacy Policy</a>.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
