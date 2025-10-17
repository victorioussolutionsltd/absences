/**
 * Date utility functions for absence management
 */

/**
 * Calculate the correct end date for an absence based on start date and duration
 * @param startDate - The start date in YYYY-MM-DD format
 * @param days - The number of days for the absence (optional)
 * @returns The end date in YYYY-MM-DD format
 */
export const calculateEndDate = (startDate: string, days?: number): string => {
  if (!days || days <= 0) {
    return startDate; // If no days specified, end date is same as start date
  }
  
  const start = new Date(startDate);
  // Add (days - 1) because if absence is 1 day, start and end should be the same
  const end = new Date(start);
  end.setDate(start.getDate() + (days - 1));
  
  return end.toISOString().split('T')[0]; // Return in YYYY-MM-DD format
};

/**
 * Format a date string to a localized date format
 * @param dateString - The date string to format
 * @param locale - The locale to use for formatting (default: 'en-GB')
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, locale: string = 'en-GB'): string => {
  try {
    return new Date(dateString).toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};
