import { FindCallback, JsonDB } from 'node-json-db';

import { Level, Project } from '@models';

export class JSONDatabaseService {
	private readonly database: JsonDB;

	constructor(filePath: string) {
		this.database = new JsonDB(filePath, true, true, '/');
	}

	init() {
		if (!this.database.exists('/projects')) {
			this.database.push('/projects', []);
		}
	}

	async readProjects(): Promise<Project[]> {
		return this.read<Project[]>('/projects');
	}

	async readProject(id: string): Promise<Project> {
		return this.read('/projects', (project: Project) => project.id === id);
	}

	async writeProject(project: Project) {
		return this.write('/projects', project, true, 'id');
	}

	async readProjectLevel(id: string, levelId: string): Promise<Level> {
		const projectIndex = this.database.getIndex('/projects', id, 'id');
		const level = await this.read<Level>(
			`/projects[${projectIndex !== -1 ? projectIndex : ''}]`,
			(level: Level) => level.id === levelId
		);
		return level;
	}

	private async read<T>(
		path: string,
		findCallback?: FindCallback
	): Promise<T> {
		if (findCallback) {
			const entity = this.database.find<T>(path, findCallback);
			return new Promise<T>((resolve, reject) =>
				entity ? resolve(entity) : reject('Not found')
			);
		} else {
			const entities = this.database.getObject<T>(path);
			return new Promise<T>((resolve, reject) =>
				entities ? resolve(entities) : reject('Not found')
			);
		}
	}

	private async write<T extends { [key: string]: any }>(
		path: string,
		data: T,
		isArray: boolean,
		idProperty?: string
	): Promise<void> {
		if (isArray && idProperty) {
			const index = this.database.getIndex(
				path,
				data[idProperty],
				idProperty
			);
			this.database.push(
				`${path}[${index !== -1 ? index.toString() : ''}]`,
				data,
				true
			);
		} else {
			this.database.push(path, data, true);
		}
		return new Promise((resolve, reject) => resolve());
	}
}
