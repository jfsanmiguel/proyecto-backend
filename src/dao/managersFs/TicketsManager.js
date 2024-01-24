import * as fs from "fs";
class ticketManager {

    constructor(path) {
        this.path = path;
    }

    async getAll() {
        const tickets = await getJsonFromFile(this.path);
        return tickets;
    }
    async getOne(tid) {
        const tickets = await getJsonFromFile(this.path);
        let ticketId = tickets.find(ide => ide.id === tid);
        if (!ticketId) {
            console.log("Not found");
            return
        } else {
            console.log(ticketId);
            return ticketId;
        }
    }
    async createticket(data) {
        const tickets = await getJsonFromFile(this.path);
        let date= new Date();
        const newticket = {
            _id: Date.now() + 13,
            code:data.code,
            products:data.products,
            amount:data.amount,
            purchaser:data.purchaser,
            purchase_Datetime:date.toISOString().split('T')[0],

        };
        tickets.push(newticket);
        await saveJsonInFile(this.path, tickets);
        return newticket;
    }
    async updateticketById(tid, data) {
        const tickets = await getJsonFromFile(this.path);
        let ticketId = tickets.find(ide => ide.id === tid);
        if (!ticketId) {
            console.log("Not found");
            return
        } else {
            ticketId.ticket = data;
            await saveJsonInFile(this.path, tickets);
            console.log('ticket updated successfully');
        }

    }
    async deleteById(tid) {
        const tickets = await getJsonFromFile(this.path);
        let ticketId = tickets.find(ide => ide.id === tid);
        if (!ticketId) {
            console.log("Not found");
            return
        } else {
            const index = tickets.indexOf(ticketId);
            tickets.splice(index, 1);
            await saveJsonInFile(this.path, tickets);
        }
        console.log('ticket deleted successfully');
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


export default ticketManager