export type Challenge = {key: string, star: 0 | 1 | 2, solve: (print: (s: string) => void) => string};

export const Challenges: Challenge[] = [

    {key: "1", star: 2, solve: require("./day1/solve").solve},
	//{key: "2", star: 0, solve: require("./day2/solve").solve},

]