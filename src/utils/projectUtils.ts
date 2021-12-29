import { ProjectWithLevelsAndSteps } from '@data/models';
import {
	calculateCompletionRate,
	calculateCompletionRateWithoutOptionals,
	calculateTotalPoints,
	calculateWonPoints,
	generateLevelWithStats,
} from '@utils/levelUtils';
import { ProgressiveElement } from '@models';

export function generateProjectWithStats(
	project: ProjectWithLevelsAndSteps,
	withLevels: boolean = false,
	withSteps: boolean = false
): ProjectWithLevelsAndSteps &
	ProgressiveElement & { totalPoints?: number; currentPoints?: number } {
	const levels = withLevels
		? project.levels?.map((level) =>
				generateLevelWithStats(level, withSteps)
		  )
		: null;
	const totalPoints = project.levels?.reduce(
		(seed, level) => (seed += calculateTotalPoints(level)),
		0
	);
	const currentPoints = project.levels?.reduce(
		(seed, level) => (seed += calculateWonPoints(level)),
		0
	);

	return {
		...project,
		progress: calculateCompletionRate(project.levels),
		progressWithoutOptionals: calculateCompletionRateWithoutOptionals(
			project.levels
		),
		levels,
		totalPoints,
		currentPoints,
	};
}
