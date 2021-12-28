import { Project, Level, Step, Prisma } from '@prisma/client';

export type ProjectWithLevelsAndSteps = Project & {
	levels?: NullableLevels;
};

export type ChainedLevelWithSteps =
	| (LevelWithSteps & {
			previousLevel?: LevelWithSteps | null | undefined;
			nextLevel?: LevelWithSteps | null | undefined;
			steps?: NullableSteps;
	  })
	| null
	| undefined;

export type LevelWithSteps = Level & { steps?: NullableSteps };
export type NullableLevels = LevelWithSteps[] | null | undefined;

export type NullableSteps = Step[] | null | undefined;

export type { Project, Level, Step, Prisma } from '@prisma/client';
