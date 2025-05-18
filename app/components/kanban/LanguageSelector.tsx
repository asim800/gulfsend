"use client"

import { useState } from "react"

const languages = [
  { code: "en", label: "English" },
  { code: "ur", label: "اردو" },
]

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en")

  return (
    <div className="flex flex-col gap-4 justify-center">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setSelectedLanguage(lang.code)}
          className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl shadow border border-gray-100 bg-gray-50 text-lg font-medium focus:outline-none transition
            ${selectedLanguage === lang.code ? "ring-2 ring-[#0097a7] bg-[#e0f7fa]" : "hover:bg-gray-100"}
          `}
          tabIndex={0}
          aria-label={`Select language ${lang.label}`}
          aria-pressed={selectedLanguage === lang.code}
        >
          <span>{lang.label}</span>
          {lang.code === "ur" && (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector 