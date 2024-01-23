import * as fs from "fs";

class MessageManager {

    constructor(path) {
        this.path = path;
    }

     getMessages(){
        return getJsonFromFile(this.path);
    }
     async getById(mid){
        const messages = await getJsonFromFile(this.path);
        let messageId = messages.find(ide => ide.id === mid);
        if (!messageId) {
            console.log("Not found");
            return
        } else {
            console.log(messageId);
            return messageId;
        }
    }
     async sendMessage(customer,data){
        const messages= await getJsonFromFile(this.path);
        const newMessage={
            customer:customer,
            id: Date.now()+13,
            message:data,
        
            };
            messages.push(newMessage);
            await saveJsonInFile(this.path, messages);
            return newMessage;
    }
     async updateMessage(mid,data){
        const messages = await getJsonFromFile(this.path);
        let messageId = messages.find(ide => ide.id === mid);
        if (!messageId) {
            console.log("Not found");
            return
        } else{
            messageId.message=data;
            await saveJsonInFile(this.path, messages);
        console.log('message updated successfully');
        }

    }
     async deleteMessage(mid){
        const messages = await getJsonFromFile(this.path);
        let messageId = messages.find(ide => ide.id === mid);
        if (!messageId) {
            console.log("Not found");
            return
        } else{
            const index = messages.indexOf(messageId);
            messages.splice(index, 1);
            await saveJsonInFile(this.path, messages);
        }
        console.log('message deleted successfully');
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


export default MessageManager