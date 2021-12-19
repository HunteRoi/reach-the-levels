import { JSONDatabaseService } from './JSONDatabaseService';

const singleDbService = new JSONDatabaseService('./db.json');
singleDbService.init();

export default singleDbService;
