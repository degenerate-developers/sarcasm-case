// vim: noexpandtab
'use strict';

/**
 * @author S0AndS0
 * @license SEE LICENSE IN REPOSITORY
 */

import type * as Sarcasm_Case from '@degenerate-developers/sarcasm-case/@types/';

import { mergeDeep } from './lib/merge-deep';

const defaults = {
	lower: { min: 'a', max: 'z' },
	upper: { min: 'A', max: 'Z' },
};

/**
 * lines - Lines to apply sarcasm filters to
 * configurations - Adjust alphabet upper/lower ranges of letters
 */
function sarcasmCase<Lower_Min = 'a', Lower_Max = 'z', Upper_Min = 'A', Upper_Max = 'Z'>(
	lines: string[],
	options: Sarcasm_Case.Configurations<
		Lower_Min,
		Lower_Max,
		Upper_Min,
		Upper_Max
	> = {} as Sarcasm_Case.Configurations<Lower_Min, Lower_Max, Upper_Min, Upper_Max>
): string[] {
	const configurations = mergeDeep(defaults, options) as Sarcasm_Case.Configurations<
		Lower_Min,
		Lower_Max,
		Upper_Min,
		Upper_Max
	>;

	const code_point_ranges = Object.entries(configurations).reduce(
		(accumulate_ranges, [key_range, range_data]) => {
			accumulate_ranges[key_range] = Object.entries(range_data).reduce(
				(accumulate_letters, [key_character, character]) => {
					const point = character.toString().codePointAt(0);
					if (!point) {
						throw new Error(`Cannot be parsed to point -> ${character}`);
					}

					accumulate_letters[key_character] = point;
					return accumulate_letters;
				},
				{} as Sarcasm_Case.Code_Point_Range_Entry
			);
			return accumulate_ranges;
		},
		{} as Sarcasm_Case.Code_Point_Ranges
	);

	const difference = Math.abs(code_point_ranges.lower.min - code_point_ranges.upper.min);

	return lines.map((line) => {
		return [...line.toString()]
			.map((character) => {
				const point = character.codePointAt(0);
				if (!point) {
					throw new Error(`Cannot be parsed to point -> ${character}`);
				}

				/* Do not change characters outside of code_point_ranges */
				if (
					!Object.values(code_point_ranges).some(({ min, max }) => {
						return point >= min && point <= max;
					})
				) {
					return character;
				}

				/* Do not change some characters at random */
				if (((Math.random() * 10) | 0) % 2 === 0) {
					return character;
				}

				/* Flip upper/lower-case */
				return point >= code_point_ranges.lower.min && point <= code_point_ranges.lower.max
					? String.fromCodePoint(point - difference)
					: String.fromCodePoint(point + difference);
			})
			.join('');
	});
}

exports = module.exports = { sarcasmCase };
export { sarcasmCase };
