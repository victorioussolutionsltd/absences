'use client';

import { useState } from 'react';
import { setLanguage, getCurrentLanguage, type SupportedLanguage } from '../i18n/translations';

interface LanguageSwitcherProps {
  readonly onLanguageChange?: () => void;
}

export function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(getCurrentLanguage());

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇬🇧' },
    { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
    { code: 'de' as const, name: 'Deutsch', flag: '🇩🇪' }
  ];

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setCurrentLang(lang);
    // Trigger re-render of parent components
    onLanguageChange?.();
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Language:</span>
      <select
        value={currentLang}
        onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;