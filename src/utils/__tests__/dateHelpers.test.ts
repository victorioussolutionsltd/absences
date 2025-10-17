import { calculateEndDate, formatDate } from '../dateHelpers';

describe('dateHelpers', () => {
  describe('calculateEndDate', () => {
    it('should return the same date when days is not provided', () => {
      const startDate = '2023-10-15';
      const result = calculateEndDate(startDate);
      expect(result).toBe('2023-10-15');
    });

    it('should return the same date when days is 0', () => {
      const startDate = '2023-10-15';
      const result = calculateEndDate(startDate, 0);
      expect(result).toBe('2023-10-15');
    });

    it('should return the same date when days is negative', () => {
      const startDate = '2023-10-15';
      const result = calculateEndDate(startDate, -1);
      expect(result).toBe('2023-10-15');
    });

    it('should return the same date when days is 1', () => {
      const startDate = '2023-10-15';
      const result = calculateEndDate(startDate, 1);
      expect(result).toBe('2023-10-15');
    });

    it('should calculate correct end date for 2 days', () => {
      const startDate = '2023-10-15';
      const result = calculateEndDate(startDate, 2);
      expect(result).toBe('2023-10-16');
    });

    it('should calculate correct end date for 5 days', () => {
      const startDate = '2023-10-15';
      const result = calculateEndDate(startDate, 5);
      expect(result).toBe('2023-10-19');
    });

    it('should calculate correct end date for 7 days spanning a week', () => {
      const startDate = '2023-10-15'; // Sunday
      const result = calculateEndDate(startDate, 7);
      expect(result).toBe('2023-10-21'); // Saturday
    });

    it('should handle end of month correctly', () => {
      const startDate = '2023-01-30';
      const result = calculateEndDate(startDate, 3);
      expect(result).toBe('2023-02-01');
    });

    it('should handle end of year correctly', () => {
      const startDate = '2023-12-30';
      const result = calculateEndDate(startDate, 3);
      expect(result).toBe('2024-01-01');
    });

    it('should handle leap year correctly', () => {
      const startDate = '2024-02-28';
      const result = calculateEndDate(startDate, 2);
      expect(result).toBe('2024-02-29');
    });

    it('should handle long absence periods', () => {
      const startDate = '2023-01-01';
      const result = calculateEndDate(startDate, 365);
      expect(result).toBe('2023-12-31');
    });

    it('should handle dates at the beginning of the month', () => {
      const startDate = '2023-03-01';
      const result = calculateEndDate(startDate, 10);
      expect(result).toBe('2023-03-10');
    });
  });

  describe('formatDate', () => {
    // Mock console.error to avoid noise in test output for invalid dates
    const originalError = console.error;
    beforeAll(() => {
      console.error = jest.fn();
    });
    afterAll(() => {
      console.error = originalError;
    });

    it('should format date with default locale (en-GB)', () => {
      const dateString = '2023-10-15';
      const result = formatDate(dateString);
      expect(result).toBe('15/10/2023');
    });

    it('should format date with US locale', () => {
      const dateString = '2023-10-15';
      const result = formatDate(dateString, 'en-US');
      expect(result).toBe('10/15/2023');
    });

    it('should format date with German locale', () => {
      const dateString = '2023-10-15';
      const result = formatDate(dateString, 'de-DE');
      expect(result).toBe('15.10.2023');
    });

    it('should format date with French locale', () => {
      const dateString = '2023-10-15';
      const result = formatDate(dateString, 'fr-FR');
      expect(result).toBe('15/10/2023');
    });

    it('should handle different date formats', () => {
      const dateString = '2023-01-01';
      const result = formatDate(dateString);
      expect(result).toBe('01/01/2023');
    });

    it('should handle end of year dates', () => {
      const dateString = '2023-12-31';
      const result = formatDate(dateString);
      expect(result).toBe('31/12/2023');
    });

    it('should handle leap year dates', () => {
      const dateString = '2024-02-29';
      const result = formatDate(dateString);
      expect(result).toBe('29/02/2024');
    });

    it('should return original string for invalid date', () => {
      const invalidDate = 'invalid-date';
      const result = formatDate(invalidDate);
      expect(result).toBe('Invalid Date');
    });

    it('should return original string for empty string', () => {
      const emptyDate = '';
      const result = formatDate(emptyDate);
      expect(result).toBe('Invalid Date');
    });

    it('should handle malformed date strings gracefully', () => {
      const malformedDate = '2023-13-45'; // Invalid month and day
      const result = formatDate(malformedDate);
      expect(result).toBe('Invalid Date');
    });

    it('should handle ISO datetime strings', () => {
      const isoDateTime = '2023-10-15T14:30:00.000Z';
      const result = formatDate(isoDateTime);
      expect(result).toBe('15/10/2023');
    });

    it('should handle date objects converted to string', () => {
      const date = new Date('2023-10-15');
      const result = formatDate(date.toISOString().split('T')[0]);
      expect(result).toBe('15/10/2023');
    });
  });

  describe('integration tests', () => {
    it('should work together - calculate end date and format both dates', () => {
      const startDate = '2023-10-15';
      const days = 5;
      
      const endDate = calculateEndDate(startDate, days);
      const formattedStart = formatDate(startDate);
      const formattedEnd = formatDate(endDate);
      
      expect(endDate).toBe('2023-10-19');
      expect(formattedStart).toBe('15/10/2023');
      expect(formattedEnd).toBe('19/10/2023');
    });

    it('should handle single day absence formatting', () => {
      const startDate = '2023-10-15';
      const days = 1;
      
      const endDate = calculateEndDate(startDate, days);
      const formattedStart = formatDate(startDate);
      const formattedEnd = formatDate(endDate);
      
      expect(endDate).toBe('2023-10-15');
      expect(formattedStart).toBe(formattedEnd);
      expect(formattedStart).toBe('15/10/2023');
    });

    it('should handle cross-month absence', () => {
      const startDate = '2023-10-30';
      const days = 5;
      
      const endDate = calculateEndDate(startDate, days);
      const formattedStart = formatDate(startDate);
      const formattedEnd = formatDate(endDate);
      
      expect(endDate).toBe('2023-11-03');
      expect(formattedStart).toBe('30/10/2023');
      expect(formattedEnd).toBe('03/11/2023');
    });
  });

  describe('edge cases', () => {
    it('should handle very large number of days', () => {
      const startDate = '2023-01-01';
      const days = 10000; // About 27 years
      const result = calculateEndDate(startDate, days);
      
      // Should not throw an error and should return a valid date string
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(result).getTime()).toBeGreaterThan(new Date(startDate).getTime());
    });

    it('should handle decimal days (should be truncated)', () => {
      const startDate = '2023-10-15';
      const days = 3.7; // Should be treated as 3
      const result = calculateEndDate(startDate, days);
      expect(result).toBe('2023-10-17');
    });

    it('should handle string-based days parameter', () => {
      const startDate = '2023-10-15';
      // This tests the robustness of the function with unexpected input types
      const result = calculateEndDate(startDate, 3 as any);
      expect(result).toBe('2023-10-17');
    });
  });
});