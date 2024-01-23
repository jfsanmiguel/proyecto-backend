import * as fs from "fs";
import UserDTO from "../../dto/user.dto.js";
class userManager {

    constructor(path) {
        this.path = path;
    }

    async getAll() {
        const users = await getJsonFromFile(this.path);
        return users.map(user=> new UserDTO(user));
    }
    async getOne(uid) {
        const users = await getJsonFromFile(this.path);
        let userId = users.find(ide => ide.id === mid);
        if (!userId) {
            console.log("Not found");
            return
        } else {
            console.log(userId);
            return userId;
        }
    }
    async createUser(data) {
        const users = await getJsonFromFile(this.path);
        const newuser = {
            _id: Date.now() + 13,
            first_Name: data.first_Name,
            last_Name: data.last_Name,
            email: data.email,
            password: data.password,
            age: data.age,
            cart: data.cart,
            role: data.role

        };
        users.push(newuser);
        await saveJsonInFile(this.path, users);
        return newuser;
    }
    async updateUserById(uid, data) {
        const users = await getJsonFromFile(this.path);
        let userId = users.find(ide => ide.id === uid);
        if (!userId) {
            console.log("Not found");
            return
        } else {
            userId.user = data;
            await saveJsonInFile(this.path, users);
            console.log('user updated successfully');
        }

    }
    async deleteById(uid) {
        const users = await getJsonFromFile(this.path);
        let userId = users.find(ide => ide.id === uid);
        if (!userId) {
            console.log("Not found");
            return
        } else {
            const index = users.indexOf(userId);
            users.splice(index, 1);
            await saveJsonInFile(this.path, users);
        }
        console.log('user deleted successfully');
    }


}

const getJsonFromFile = async (path) => {
    if (!fs.existsSync(path)) {
        return [];

    }
    const content = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(content);
};

const saveJsonInFile = (path, data) => {
    const content = JSON.stringify(data, null, '\t');//tabulación
    return fs.promises.writeFile(path, content, 'utf-8'); // return vale como async await (devuelve promesa)
}


export default userManager