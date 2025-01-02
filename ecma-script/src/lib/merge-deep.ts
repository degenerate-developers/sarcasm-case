// vim: noexpandtab
'use strict';

/**
 * @author S0AndS0
 * @license SEE LICENSE IN REPOSITORY
 */

type Data = {
	[key: string]:
		| boolean
		| string
		| Date
		| RegExp
		| Blob
		| File
		| FileList
		| ArrayBuffer
		| ArrayBufferView
		| ImageBitmap
		| ImageData
		| Array<Data | any>
		| Data
		| Map<string, Data | any>
		| Set<Data | any>
		| any;
};

/**
 * Merge two or more objects and return result without mutation
 *
 * @param {Object} base
 * @param {Object[]} sources
 * @returns {Object}
 *
 * @example <caption>Merge two dictionaries</caption>
 * ```javascript
 * const one = { key: 'value' };
 * const two = { other: 'thing' };
 *
 * const result = mergeDeep(one, two);
 *
 * assert(result.key == 'value', "Failed to merge `one` into `result`");
 * assert(result.other == 'thing', "Failed to merge `two` into `result`");
 * ```
 *
 * @example <caption>Merge three dictionaries</caption>
 * ```javascript
 * const one = { key: 'value' };
 * const two = { other: 'thing' };
 * const three = { nested: { inner: 'state' } };
 *
 * const result = mergeDeep(one, two, three);
 *
 * assert(result.key == 'value', "Failed to merge `one` into `result`");
 * assert(result.other == 'thing', "Failed to merge `two` into `result`");
 * assert(result.nested?.inner == 'state', "Failed to merge `three` into `result`");
 * ```
 *
 * @author S0AndS0
 * @license SEE LICENSE IN REPOSITORY
 *
 * @see {@link https://github.com/javascript-utilities/merge-deep|GitHub repository for this function}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/structuredClone|MDN `structuredClone` documentation}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm|MDN `structuredClone` algorithm}
 */
function mergeDeep(base: Data, ...sources: Data[]): Data {
	return sources.reduce((result, source) => {
		return Object.entries(source).reduce((accumulator, [key, value]) => {
			if (accumulator[key] && accumulator[key].constructor === Object) {
				accumulator[key] = mergeDeep(accumulator[key], value);
			} else {
				accumulator[key] = structuredClone(value);
			}

			return accumulator;
		}, result);
	}, structuredClone(base));
}

exports = module.exports = { mergeDeep };
export { mergeDeep };
