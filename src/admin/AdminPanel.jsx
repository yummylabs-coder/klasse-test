import { useState, useEffect, useRef } from 'react'
import { useAdminConfig } from './AdminConfigContext'
import ColorPicker from './controls/ColorPicker'
import SliderControl from './controls/SliderControl'
import TextControl from './controls/TextControl'
import ToggleControl from './controls/ToggleControl'
import SelectControl from './controls/SelectControl'
import './AdminPanel.css'

const TABS = ['Colors', 'Typography', 'Content', 'Cards', 'Layout']

const BRAND_FONT_OPTIONS = [
  { label: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans' },
  { label: 'Poppins', value: 'Poppins' },
  { label: 'Inter', value: 'Inter' },
  { label: 'Outfit', value: 'Outfit' },
  { label: 'DM Sans', value: 'DM Sans' },
]

const BODY_FONT_OPTIONS = [
  { label: 'DM Sans', value: 'DM Sans' },
  { label: 'Inter', value: 'Inter' },
  { label: 'Poppins', value: 'Poppins' },
  { label: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans' },
  { label: 'Outfit', value: 'Outfit' },
]

const WEIGHT_OPTIONS = [
  { label: 'Semibold (600)', value: '600' },
  { label: 'Bold (700)', value: '700' },
  { label: 'Extra Bold (800)', value: '800' },
]

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(() => window.location.hash === '#admin')
  const [activeTab, setActiveTab] = useState('Colors')
  const { config, updateConfig, resetConfig, exportConfig, importConfig } = useAdminConfig()
  const fileInputRef = useRef(null)

  useEffect(() => {
    const onHashChange = () => setIsOpen(window.location.hash === '#admin')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const handleClose = () => {
    window.location.hash = ''
    setIsOpen(false)
  }

  const handleExport = () => {
    const json = exportConfig()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'klasse-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const success = importConfig(ev.target.result)
      if (!success) alert('Invalid config file')
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={handleClose} />
      <div className="admin-panel admin-panel--open fixed top-0 right-0 h-full w-80 bg-gray-900 text-white z-50 flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.3)] border-l border-gray-700">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h2 className="font-semibold text-sm">Admin Editor</h2>
          <button onClick={handleClose} className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors border-0 bg-transparent">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="flex border-b border-gray-700 px-2 overflow-x-auto gap-1">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2.5 text-xs font-medium whitespace-nowrap border-0 bg-transparent cursor-pointer transition-colors ${
                activeTab === tab ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'
              }`}
              style={activeTab === tab ? { borderBottom: '2px solid #3b82f6', marginBottom: '-1px' } : {}}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto admin-scroll p-4 space-y-4">
          {activeTab === 'Colors' && <ColorsTab config={config} updateConfig={updateConfig} />}
          {activeTab === 'Typography' && <TypographyTab config={config} updateConfig={updateConfig} />}
          {activeTab === 'Content' && <ContentTab config={config} updateConfig={updateConfig} />}
          {activeTab === 'Cards' && <CardsTab config={config} updateConfig={updateConfig} />}
          {activeTab === 'Layout' && <LayoutTab config={config} updateConfig={updateConfig} />}
        </div>
        <div className="px-4 py-3 border-t border-gray-700 flex gap-2">
          <button onClick={resetConfig} className="flex-1 px-3 py-2 text-xs font-medium bg-red-900/40 hover:bg-red-900/60 text-red-300 rounded-lg transition-colors border-0 cursor-pointer">Reset</button>
          <button onClick={handleExport} className="flex-1 px-3 py-2 text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors border-0 cursor-pointer">Export</button>
          <button onClick={handleImport} className="flex-1 px-3 py-2 text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors border-0 cursor-pointer">Import</button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} className="hidden" />
        </div>
      </div>
    </>
  )
}

function SectionLabel({ children }) {
  return <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium mt-2 first:mt-0">{children}</p>
}

function ColorsTab({ config, updateConfig }) {
  return (
    <>
      <SectionLabel>Brand</SectionLabel>
      <ColorPicker label="Brand Background" value={config.colors.brandInk} onChange={v => updateConfig('colors.brandInk', v)} />
      <ColorPicker label="Page Background" value={config.colors.brandCanvas} onChange={v => updateConfig('colors.brandCanvas', v)} />
      <ColorPicker label="Accent Orange" value={config.colors.accentOrange} onChange={v => updateConfig('colors.accentOrange', v)} />

      <SectionLabel>Buttons</SectionLabel>
      <ColorPicker label="Primary Button" value={config.colors.actionPrimary} onChange={v => updateConfig('colors.actionPrimary', v)} />
      <ColorPicker label="Button Hover" value={config.colors.actionPrimaryHover} onChange={v => updateConfig('colors.actionPrimaryHover', v)} />

      <SectionLabel>Text</SectionLabel>
      <ColorPicker label="Primary Text" value={config.colors.textPrimary} onChange={v => updateConfig('colors.textPrimary', v)} />
      <ColorPicker label="Secondary Text" value={config.colors.textSecondary} onChange={v => updateConfig('colors.textSecondary', v)} />
      <ColorPicker label="Light Text" value={config.colors.textOnDark} onChange={v => updateConfig('colors.textOnDark', v)} />

      <SectionLabel>Borders</SectionLabel>
      <ColorPicker label="Border" value={config.colors.borderDefault} onChange={v => updateConfig('colors.borderDefault', v)} />
      <ColorPicker label="Focus Ring" value={config.colors.borderFocus} onChange={v => updateConfig('colors.borderFocus', v)} />
    </>
  )
}

function TypographyTab({ config, updateConfig }) {
  return (
    <>
      <SectionLabel>Fonts</SectionLabel>
      <SelectControl label="Brand / Headings" value={config.typography.brandFont} onChange={v => updateConfig('typography.brandFont', v)} options={BRAND_FONT_OPTIONS} />
      <SelectControl label="Body Text" value={config.typography.bodyFont} onChange={v => updateConfig('typography.bodyFont', v)} options={BODY_FONT_OPTIONS} />

      <SectionLabel>Sizes</SectionLabel>
      <SliderControl label="Hero Headline" value={config.typography.headlineSize} onChange={v => updateConfig('typography.headlineSize', v)} min={24} max={56} step={1} unit="px" />
      <SliderControl label="Form Title" value={config.typography.formTitleSize} onChange={v => updateConfig('typography.formTitleSize', v)} min={16} max={36} step={1} unit="px" />
      <SliderControl label="Body Text" value={config.typography.bodySize} onChange={v => updateConfig('typography.bodySize', v)} min={12} max={20} step={1} unit="px" />

      <SectionLabel>Weight</SectionLabel>
      <SelectControl label="Headline Weight" value={config.typography.headlineWeight} onChange={v => updateConfig('typography.headlineWeight', v)} options={WEIGHT_OPTIONS} />
    </>
  )
}

function ContentTab({ config, updateConfig }) {
  return (
    <>
      <SectionLabel>Hero</SectionLabel>
      <TextControl label="Headline Line 1" value={config.content.headlineLine1} onChange={v => updateConfig('content.headlineLine1', v)} />
      <TextControl label="Headline Line 2" value={config.content.headlineLine2} onChange={v => updateConfig('content.headlineLine2', v)} />
      <TextControl label="Accent Word (italic)" value={config.content.headlineAccent} onChange={v => updateConfig('content.headlineAccent', v)} />
      <TextControl label="Subheadline" value={config.content.subheadline} onChange={v => updateConfig('content.subheadline', v)} multiline />

      <SectionLabel>Form</SectionLabel>
      <TextControl label="Form Title" value={config.content.formTitle} onChange={v => updateConfig('content.formTitle', v)} />
      <TextControl label="Form Subtitle" value={config.content.formSubtitle} onChange={v => updateConfig('content.formSubtitle', v)} />
      <TextControl label="Submit Button" value={config.content.submitButtonText} onChange={v => updateConfig('content.submitButtonText', v)} />
      <TextControl label="Google Button" value={config.content.googleButtonText} onChange={v => updateConfig('content.googleButtonText', v)} />
      <TextControl label="Divider Text" value={config.content.dividerText} onChange={v => updateConfig('content.dividerText', v)} />

      <SectionLabel>Sign In</SectionLabel>
      <TextControl label="Sign-in Prompt" value={config.content.signinPrompt} onChange={v => updateConfig('content.signinPrompt', v)} />
      <TextControl label="Sign-in Link" value={config.content.signinLinkText} onChange={v => updateConfig('content.signinLinkText', v)} />
    </>
  )
}

function CardsTab({ config, updateConfig }) {
  return (
    <>
      {config.cards.map((card, i) => (
        <div key={i} className="space-y-3 pb-4 border-b border-gray-800 last:border-0">
          <div className="flex items-center justify-between">
            <SectionLabel>Card {i + 1}</SectionLabel>
            <ToggleControl label="" checked={card.visible} onChange={v => updateConfig(`cards.${i}.visible`, v)} />
          </div>
          <TextControl label="Title" value={card.title} onChange={v => updateConfig(`cards.${i}.title`, v)} />
          <TextControl label="Instructor" value={card.instructor} onChange={v => updateConfig(`cards.${i}.instructor`, v)} />
          <TextControl label="Badge" value={card.badge} onChange={v => updateConfig(`cards.${i}.badge`, v)} />
          <TextControl label="Lessons" value={card.lessons} onChange={v => updateConfig(`cards.${i}.lessons`, v)} />
          <TextControl label="Price" value={card.price} onChange={v => updateConfig(`cards.${i}.price`, v)} />
          <TextControl label="Emoji" value={card.emoji} onChange={v => updateConfig(`cards.${i}.emoji`, v)} />
        </div>
      ))}
    </>
  )
}

function LayoutTab({ config, updateConfig }) {
  return (
    <>
      <SectionLabel>Visibility</SectionLabel>
      <ToggleControl label="Google Button" checked={config.layout.showGoogleButton} onChange={v => updateConfig('layout.showGoogleButton', v)} />
      <ToggleControl label="Divider" checked={config.layout.showDivider} onChange={v => updateConfig('layout.showDivider', v)} />
      <ToggleControl label="Course Cards" checked={config.layout.showCourseCards} onChange={v => updateConfig('layout.showCourseCards', v)} />
      <ToggleControl label="Terms Text" checked={config.layout.showTerms} onChange={v => updateConfig('layout.showTerms', v)} />

      <SectionLabel>Style</SectionLabel>
      <SliderControl label="Border Radius" value={config.layout.borderRadius} onChange={v => updateConfig('layout.borderRadius', v)} min={0} max={24} step={1} unit="px" />

      <SectionLabel>Layout</SectionLabel>
      <SelectControl
        label="Brand Panel Position"
        value={config.layout.brandPanelPosition}
        onChange={v => updateConfig('layout.brandPanelPosition', v)}
        options={[
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
        ]}
      />
    </>
  )
}
