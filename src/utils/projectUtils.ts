import {
	calculateCompletionRate,
	calculateCompletionRateWithoutOptionals,
	generateLevelWithStats,
	levelIsDone,
	levelIsFullyDone,
} from '@utils/levelUtils';
import { Project } from '@models';

export function generateProjectWithStats(
	project: Project,
	withLevels: boolean = false,
	withSteps: boolean = false
): Project {
	return {
		...project,
		progress: calculateCompletionRate(project.levels),
		progressWithoutOptionals: calculateCompletionRateWithoutOptionals(
			project.levels
		),
		levels: withLevels
			? project.levels.map((level) =>
					generateLevelWithStats(level, withSteps)
			  )
			: [],
	};
}
