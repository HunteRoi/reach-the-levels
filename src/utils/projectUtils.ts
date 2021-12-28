import { ProgressiveElement, ProjectWithLevelsAndSteps } from '@data/models';
import {
	calculateCompletionRate,
	calculateCompletionRateWithoutOptionals,
	generateLevelWithStats,
} from '@utils/levelUtils';

export function generateProjectWithStats(
	project: ProjectWithLevelsAndSteps,
	withLevels: boolean = false,
	withSteps: boolean = false
): ProjectWithLevelsAndSteps & ProgressiveElement {
	const levels = withLevels
		? project.levels?.map((level) =>
				generateLevelWithStats(level, withSteps)
		  )
		: null;

	return {
		...project,
		progress: calculateCompletionRate(project.levels),
		progressWithoutOptionals: calculateCompletionRateWithoutOptionals(
			project.levels
		),
		levels,
	};
}
