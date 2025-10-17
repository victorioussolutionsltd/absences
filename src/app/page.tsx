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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t('page.title')}
          </h1>
          <LanguageSwitcher onLanguageChange={handleLanguageChange} />
        </div>
        <AbsencesTable key={refreshKey} />
      </div>
    </div>
  );
}
