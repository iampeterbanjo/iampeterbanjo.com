export const twoDecimalPlaces = (double: number): number =>
	Number(Math.round(parseFloat(double + 'e2')) + 'e-2');

export function* getTimesCalled(start: number): Generator<number> {
	while (true) {
		yield start++;
	}
}
