import { value, test } from "./input";

export const solve = (print: (s: string) => void) => {
    print("1. Load User Input...");

    const lines = value.split("\n");
    var left: number[] = [];
    var right: number[] = [];

    lines.forEach((line) => {
        if (line !== "") {
            const [l, r] = line.split("   ");
            left.push(parseInt(l))
            right.push(parseInt(r))
        }
    })

    left = left.sort()
    right = right.sort()

	print("2. Parse and sort...");

    const diff = left.reduce( (acc, curr, i) => acc + Math.abs(curr - right[i]), 0);

    print("3. Calculated Part 1:");
    print("-> " + diff.toString())

	const countedSet = right.reduce((acc: any, num: number) => {
		acc[num] = (acc[num] || 0) + 1;
		return acc;
	}, {});

	print("4. Calculate Counted Set:");

	const score = left.reduce( (a, curr) => {
		const count = countedSet[curr.toString()];
		return a + (curr * (count !== undefined ? count : 0) )
	}, 0);

	print("5. Calculated Part 2:");
    print("-> " + score.toString())

    return score.toString();
}