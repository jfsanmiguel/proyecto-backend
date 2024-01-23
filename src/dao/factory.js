import config from "../config/config.js";

export let userDao;

switch (config.persistence){
    case'memory':
    const userDaoFs=(await import('./managersFs/UsersManager.js')).default;
    userDao= new userDaoFs();
    break;

default:
    const userDaoMongoDb=(await import('./managersMongoDB/UserManager.js')).default;
    userDao= new userDaoMongoDb();
    break;

}