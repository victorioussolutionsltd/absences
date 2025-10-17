'use client';

import { useState } from 'react';
import AbsencesTable from "@/components/AbsencesTable";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { t } from "@/i18n/translations";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLanguageChange = () => {
    // Force re-render to update translations
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('page.title')}
          </h1>
          <LanguageSwitcher onLanguageChange={handleLanguageChange} />
        </div>
        <AbsencesTable key={refreshKey} />
      </div>
    </div>
  );
}
