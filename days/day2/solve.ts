import { value, test } from "./input";

export const solve = (print: (s: string) => void) => {
    print("1. Load User Input...");

	const reports = value.split("\n").slice(1, -1);

	var safeAmount = reports.reduce((acc: number, report: string) => {
		let dir = 0;
		const nums = report.split(' ').map(Number);
		return nums.every((n, i) =>
			// First number or difference is less than or equal to 3
			!i || (Math.abs(n - nums[i - 1]) <= 3 &&
			// prev number is different to first one
			n !== nums[i - 1] &&
			// direction is the same
			(dir ||= Math.sign(n - nums[i - 1])) === Math.sign(n - nums[i - 1]))
		) ? acc + 1 : acc;
	}, 0);

	print("2. Calculated Part 1:");
    print("-> " + safeAmount.toString())

	print("3. Calculated Unsafe Reports...");

	safeAmount = 0;
	reports.forEach(line => {
		let rawNumbers = line.split(' ').map(Number);

		// for loop to enable breaking early ( foreach cant do that )
		for (let j = 0; j < rawNumbers.length; j++) {
			// clone array -> removing j'th element
			let nums = rawNumbers.slice();
			nums.splice(j, 1);

			if (
				// check if report is safe
				nums.every((_, i) =>
					i < 2 ||
					(
						(nums[i] > nums[i - 1] && nums[i - 1] > nums[i - 2]) ||
						(nums[i] < nums[i - 1] && nums[i - 1] < nums[i - 2])
					) &&
					Math.abs(nums[i] - nums[i - 1]) <= 3 &&
					nums[i] !== nums[i - 1] &&
					Math.abs(nums[i - 1] - nums[i - 2]) <= 3 &&
					nums[i - 1] !== nums[i - 2]
				)
			) {
				safeAmount += 1;
				break;
			}
		}
	});

	print("2. Calculated Part 2:");
    print("-> " + safeAmount.toString())

    return "";
}