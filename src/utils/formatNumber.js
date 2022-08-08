// formatters
import numeral from 'numeral';

// ----------------------------------------------------------------------

/**
 * Format to currency.
 * @param {*} number
 * @returns
 */
export const fCurrency = (number) => numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');

/**
 * Format to percentage.
 * @param {*} number
 * @returns
 */
export const fPercent = (number) => numeral(number / 100).format('0.0%');

/**
 * Format to number.
 * @param {*} number
 * @returns
 */
export const fNumber = (number) => numeral(number).format();

/**
 * Format to shorten umber.
 * @param {*} number
 * @returns
 */
export const fShortenNumber = (number) => numeral(number).format('0.00a').replace('.00', '');

/**
 * Format to date.
 * @param {*} number
 * @returns
 */
export const fData = (number) => numeral(number).format('0.0 b');
