import { useState } from 'react'
import { useAdminConfig } from '../admin/AdminConfigContext'

// Google Icon SVG
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.26c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
    <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
  </svg>
)

// Course Card Component for the left side
const CourseCard = ({ title, instructor, image, className = '', borderRadius }) => (
  <div className={`bg-bg-surface p-4 shadow-sm border border-white/10 ${className}`} style={{ borderRadius: `${borderRadius}px` }}>
    <div className="w-full h-24 bg-bg-muted rounded mb-3 overflow-hidden">
      {image && <img src={image} alt={title} className="w-full h-full object-cover" />}
    </div>
    <h4 className="text-text-on-dark font-medium text-sm mb-1">{title}</h4>
    <p className="text-text-on-dark/60 text-xs">{instructor}</p>
  </div>
)

const CARD_STYLES = [
  'w-48 opacity-90',
  'w-48 opacity-70 translate-y-4',
  'w-48 opacity-50 translate-y-8',
]

export default function Signup() {
  const { config } = useAdminConfig()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })

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
  const fontStyle = { fontFamily: `'${t.fontFamily}', system-ui, sans-serif` }

  return (
    <div className="min-h-screen flex flex-col" style={{ ...fontStyle, backgroundColor: c.brandCanvas }}>
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
        className="flex-1 flex p-5 gap-5"
        style={{ flexDirection: layout.brandPanelPosition === 'right' ? 'row-reverse' : 'row' }}
      >
        {/* Branding Side */}
        <div
          className="flex-1 rounded-2xl p-16 flex flex-col justify-between relative overflow-hidden"
          style={{ backgroundColor: c.brandInk }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: c.actionPrimary }}
            >
              <span className="text-white font-bold text-sm">{content.logoLetter}</span>
            </div>
            <span className="font-semibold text-lg" style={{ color: c.textOnDark }}>
              {content.logoText}
            </span>
          </div>

          {/* Headline */}
          <div className="max-w-md">
            <h1
              className="leading-tight mb-4"
              style={{
                color: c.textOnDark,
                fontSize: t.headlineSize,
                fontWeight: t.headlineWeight,
              }}
            >
              {content.headline}
            </h1>
            <p style={{ color: `${c.textOnDark}b3`, fontSize: t.bodySize }} className="text-lg">
              {content.subheadline}
            </p>
          </div>

          {/* Course Cards Preview */}
          {layout.showCourseCards && (
            <div className="relative">
              <div className="flex gap-4">
                {config.cards
                  .filter(card => card.visible)
                  .map((card, i) => (
                    <CourseCard
                      key={i}
                      title={card.title}
                      instructor={card.instructor}
                      image={card.image}
                      borderRadius={layout.borderRadius}
                      className={CARD_STYLES[i] || CARD_STYLES[CARD_STYLES.length - 1]}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Decorative gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{
              background: `linear-gradient(to top, ${c.brandInk}, transparent)`,
            }}
          />
        </div>

        {/* Signup Form Side */}
        <div className="flex-1 flex items-center justify-center p-16">
          <div className="w-full max-w-md">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2
                className="font-bold mb-2"
                style={{ color: c.textPrimary, fontSize: t.formTitleSize }}
              >
                {content.formTitle}
              </h2>
              <p style={{ color: c.textSecondary, fontSize: t.bodySize }}>
                {content.formSubtitle}
              </p>
            </div>

            {/* Google Sign Up */}
            {layout.showGoogleButton && (
              <button
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border hover:bg-bg-hover transition-colors mb-6"
                style={{ borderColor: c.borderDefault, borderRadius: radius }}
              >
                <GoogleIcon />
                <span className="font-medium" style={{ color: c.textPrimary }}>
                  {content.googleButtonText}
                </span>
              </button>
            )}

            {/* Divider */}
            {layout.showDivider && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px" style={{ backgroundColor: c.borderDefault }} />
                <span className="text-text-tertiary text-sm">{content.dividerText}</span>
                <div className="flex-1 h-px" style={{ backgroundColor: c.borderDefault }} />
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1.5" style={{ color: c.textPrimary }}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border focus:outline-none focus:ring-2 transition-all placeholder:text-text-tertiary"
                  style={{
                    borderColor: c.borderDefault,
                    borderRadius: radius,
                    '--tw-ring-color': `${c.borderFocus}33`,
                  }}
                  onFocus={e => e.target.style.borderColor = c.borderFocus}
                  onBlur={e => e.target.style.borderColor = c.borderDefault}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: c.textPrimary }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border focus:outline-none focus:ring-2 transition-all placeholder:text-text-tertiary"
                  style={{
                    borderColor: c.borderDefault,
                    borderRadius: radius,
                    '--tw-ring-color': `${c.borderFocus}33`,
                  }}
                  onFocus={e => e.target.style.borderColor = c.borderFocus}
                  onBlur={e => e.target.style.borderColor = c.borderDefault}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1.5" style={{ color: c.textPrimary }}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 8 characters"
                  className="w-full px-4 py-3 border focus:outline-none focus:ring-2 transition-all placeholder:text-text-tertiary"
                  style={{
                    borderColor: c.borderDefault,
                    borderRadius: radius,
                    '--tw-ring-color': `${c.borderFocus}33`,
                  }}
                  onFocus={e => e.target.style.borderColor = c.borderFocus}
                  onBlur={e => e.target.style.borderColor = c.borderDefault}
                />
              </div>

              <button
                type="submit"
                className="w-full font-semibold py-3 px-4 transition-colors mt-6"
                style={{
                  backgroundColor: c.actionPrimary,
                  color: c.textOnDark,
                  borderRadius: radius,
                }}
                onMouseEnter={e => e.target.style.backgroundColor = c.actionPrimaryHover}
                onMouseLeave={e => e.target.style.backgroundColor = c.actionPrimary}
              >
                {content.submitButtonText}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center mt-6" style={{ color: c.textSecondary }}>
              {content.signinPrompt}{' '}
              <a href="/signin" className="font-medium hover:underline" style={{ color: c.actionPrimary }}>
                {content.signinLinkText}
              </a>
            </p>

            {/* Terms */}
            {layout.showTerms && (
              <p className="text-center mt-6 text-text-tertiary text-xs">
                By creating an account, you agree to our{' '}
                <a href="/terms" className="underline hover:text-text-secondary">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="underline hover:text-text-secondary">Privacy Policy</a>.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
