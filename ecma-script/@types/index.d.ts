// vim: noexpandtab

/**
 * @author S0AndS0
 * @license SEE LICENSE IN REPOSITORY
 */

/**/
export interface Configurations<
	Lower_Min = 'a',
	Lower_Max = 'z',
	Upper_Min = 'A',
	Upper_Max = 'Z'
> {
	[key: string]: Configuration_Entry<
		Configuration_Entry<Lower_Min | Upper_Min, Lower_Max | Upper_Max>,
		Configuration_Entry<Lower_Min | Upper_Min, Lower_Max | Upper_Max>
	>;

	lower: Configuration_Entry<Lower_Min, Lower_Max>;
	upper: Configuration_Entry<Upper_Min, Upper_Max>;
}

/**/
export interface Configuration_Entry<Min_Letter, Max_Letter> {
	[key: string]: string | Min_Letter | Max_Letter;
	min: string | Min_Letter;
	max: string | Max_Letter;
}

/**/
export interface Code_Point_Ranges {
	[key: string]: Code_Point_Range_Entry;
	lower: Code_Point_Range_Entry;
	upper: Code_Point_Range_Entry;
}

/**/
export interface Code_Point_Range_Entry {
	[key: string]: number;
	min: number;
	max: number;
}
