// case changers
import { sentenceCase, noCase, camelCase, paramCase } from 'change-case';
import { lowerCase } from 'lower-case';
import { titleCase } from 'title-case';

// ----------------------------------------------------------------------

export const toSentenceCase = (input, options = null) => sentenceCase(input, options);

export const toNoCase = (input, options = null) => noCase(input, options);

export const toParamCase = (input, options = null) => paramCase(input, options);

export const toCamelCase = (input, options = null) => camelCase(input, options);

export const toTitleCase = (input) => titleCase(input);

export const toLowerCase = (input) => lowerCase(input);
