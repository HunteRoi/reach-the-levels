export function round(num: number, nbDecimals: number): number {
	const multiplicator = 10 ** nbDecimals;
	const value =
		Math.round((num + Number.EPSILON) * multiplicator) / multiplicator;
	return value;
}
