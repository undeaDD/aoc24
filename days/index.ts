export type Challenge = {star: 0 | 1 | 2, solve: (print: (s: string) => void) => string};

export const Challenges: Challenge[] = [

    {star: 2, solve: require("./day1/solve").solve},
	{star: 2, solve: require("./day2/solve").solve},
	//{star: 0, solve: require("./day3/solve").solve},
]