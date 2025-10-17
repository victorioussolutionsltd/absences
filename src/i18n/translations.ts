export const translations = {
  en: {
    table: {
      columns: {
        startDate: 'Start Date',
        endDate: 'End Date',
        duration: 'Duration',
        days: 'Days',
        employeeName: 'Employee Name',
        status: 'Status',
        absenceType: 'Absence Type',
        hasConflict: 'Has Conflict'
      },
      status: {
        approved: 'Approved',
        pendingApproval: 'Awaiting Approval'
      },
      conflict: {
        yes: 'Yes',
        no: 'No'
      },
      duration: {
        day: 'day',
        days: 'days',
        notAvailable: 'N/A'
      },
      absenceTypes: {
        ANNUAL_LEAVE: 'Annual Leave',
        SICKNESS: 'Sickness',
        PERSONAL: 'Personal Leave',
        MATERNITY: 'Maternity Leave',
        MEDICAL: 'Medical Leave',
        PATERNITY: 'Paternity Leave',
        HOLIDAY: 'Holiday',
        VACATION: 'Vacation',
        SICK_LEAVE: 'Sick Leave'
      },
      messages: {
        emptyTable: 'No absence records found',
        loading: 'Loading...',
        errorTitle: 'Error loading data',
        tryAgain: 'Try Again'
      }
    },
    page: {
      title: 'Absences Management System',
      subtitle: 'Employee Absences',
      description: 'Data from BrightHR API - absences and conflict information',
      recordsCount: 'Showing {{count}} absence records',
      conflictsCount: '• {{count}} with conflicts'
    },
    errors: {
      fetchAbsences: 'Failed to fetch absences: {{error}}',
      fetchConflict: 'Failed to fetch conflict for ID {{id}}: {{error}}',
      fetchData: 'Failed to fetch data'
    },
    modal: {
      close: 'Close',
      employeeAbsences: {
        title: 'All Absences for {{name}}',
        subtitle: 'Showing {{count}} absence records',
        noData: 'No absences found',
        noDataDescription: 'No absence records were found for {{name}}.'
      }
    }
  },
  es: {
    table: {
      columns: {
        startDate: 'Fecha de Inicio',
        endDate: 'Fecha de Fin',
        duration: 'Duración',
        days: 'Días',
        employeeName: 'Nombre del Empleado',
        status: 'Estado',
        absenceType: 'Tipo de Ausencia',
        hasConflict: 'Tiene Conflicto'
      },
      status: {
        approved: 'Aprobado',
        pendingApproval: 'Pendiente de Aprobación'
      },
      conflict: {
        yes: 'Sí',
        no: 'No'
      },
      duration: {
        day: 'día',
        days: 'días',
        notAvailable: 'N/D'
      },
      absenceTypes: {
        ANNUAL_LEAVE: 'Vacaciones Anuales',
        SICKNESS: 'Enfermedad',
        PERSONAL: 'Permiso Personal',
        MATERNITY: 'Baja por Maternidad',
        MEDICAL: 'Baja Médica',
        PATERNITY: 'Baja por Paternidad',
        HOLIDAY: 'Día Festivo',
        VACATION: 'Vacaciones',
        SICK_LEAVE: 'Baja por Enfermedad'
      },
      messages: {
        emptyTable: 'No se encontraron registros de ausencias',
        loading: 'Cargando...',
        errorTitle: 'Error al cargar datos',
        tryAgain: 'Intentar de Nuevo'
      }
    },
    page: {
      title: 'Sistema de Gestión de Ausencias',
      subtitle: 'Ausencias de Empleados',
      description: 'Datos de la API de BrightHR - información de ausencias y conflictos',
      recordsCount: 'Mostrando {{count}} registros de ausencias',
      conflictsCount: '• {{count}} con conflictos'
    },
    errors: {
      fetchAbsences: 'Error al obtener ausencias: {{error}}',
      fetchConflict: 'Error al obtener conflicto para ID {{id}}: {{error}}',
      fetchData: 'Error al obtener datos'
    },
    modal: {
      close: 'Cerrar',
      employeeAbsences: {
        title: 'Todas las Ausencias de {{name}}',
        subtitle: 'Mostrando {{count}} registros de ausencias',
        noData: 'No se encontraron ausencias',
        noDataDescription: 'No se encontraron registros de ausencias para {{name}}.'
      }
    }
  },
  de: {
    table: {
      columns: {
        startDate: 'Startdatum',
        endDate: 'Enddatum',
        duration: 'Dauer',
        days: 'Tage',
        employeeName: 'Mitarbeitername',
        status: 'Status',
        absenceType: 'Abwesenheitstyp',
        hasConflict: 'Hat Konflikt'
      },
      status: {
        approved: 'Genehmigt',
        pendingApproval: 'Wartend auf Genehmigung'
      },
      conflict: {
        yes: 'Ja',
        no: 'Nein'
      },
      duration: {
        day: 'Tag',
        days: 'Tage',
        notAvailable: 'N/V'
      },
      absenceTypes: {
        ANNUAL_LEAVE: 'Jahresurlaub',
        SICKNESS: 'Krankheit',
        PERSONAL: 'Persönlicher Urlaub',
        MATERNITY: 'Mutterschaftsurlaub',
        MEDICAL: 'Medizinischer Urlaub',
        PATERNITY: 'Vaterschaftsurlaub',
        HOLIDAY: 'Feiertag',
        VACATION: 'Urlaub',
        SICK_LEAVE: 'Krankenstand'
      },
      messages: {
        emptyTable: 'Keine Abwesenheitsdatensätze gefunden',
        loading: 'Laden...',
        errorTitle: 'Fehler beim Laden der Daten',
        tryAgain: 'Erneut versuchen'
      }
    },
    page: {
      title: 'Abwesenheitsverwaltungssystem',
      subtitle: 'Mitarbeiterabwesenheiten',
      description: 'Daten von BrightHR API - Abwesenheits- und Konfliktinformationen',
      recordsCount: '{{count}} Abwesenheitsdatensätze angezeigt',
      conflictsCount: '• {{count}} mit Konflikten'
    },
    errors: {
      fetchAbsences: 'Fehler beim Abrufen der Abwesenheiten: {{error}}',
      fetchConflict: 'Fehler beim Abrufen des Konflikts für ID {{id}}: {{error}}',
      fetchData: 'Fehler beim Abrufen der Daten'
    },
    modal: {
      close: 'Schließen',
      employeeAbsences: {
        title: 'Alle Abwesenheiten für {{name}}',
        subtitle: '{{count}} Abwesenheitsdatensätze angezeigt',
        noData: 'Keine Abwesenheiten gefunden',
        noDataDescription: 'Es wurden keine Abwesenheitsdatensätze für {{name}} gefunden.'
      }
    }
  }
} as const;

export type TranslationKey = keyof typeof translations.en;
export type SupportedLanguage = keyof typeof translations;

// Current language state (could be moved to context/state management)
let currentLanguage: SupportedLanguage = 'en';

// Function to change language
export const setLanguage = (lang: SupportedLanguage): void => {
  currentLanguage = lang;
};

// Function to get current language
export const getCurrentLanguage = (): SupportedLanguage => currentLanguage;

// Simple i18n function
export const t = (key: string, params?: Record<string, string | number>): string => {
  const keys = key.split('.');
  let value: any = translations[currentLanguage];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (typeof value !== 'string') {
    // Fallback to English if translation not found
    let fallbackValue: any = translations.en;
    for (const k of keys) {
      fallbackValue = fallbackValue?.[k];
    }
    value = typeof fallbackValue === 'string' ? fallbackValue : key;
  }
  
  if (params) {
    return value.replaceAll(/\{\{(\w+)\}\}/g, (match: string, paramKey: string) => {
      return params[paramKey]?.toString() || match;
    });
  }
  
  return value;
};