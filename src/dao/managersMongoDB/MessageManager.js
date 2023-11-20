import MessageModel from '../models/message.js'

export default class MessageManager{
    static getMessages(){
        return MessageModel.find();
    }
    static async getById(mid){
        const message= await MessageModel.findById(uid)
        if(!message){
            throw new Error('Message not found');
        }
        return message;
    }
    static async sendMessage(data){
        const message= await MessageModel.create(data);
        console.log('New message created successfully');
        return message;
    }
    static async updateMessage(mid,data){
        await MessageModel.updateOne({_id:mid},{$set: data});
        console.log('message updated successfully');
    }
    static async deleteMessage(mid){
        await MessageModel.deleteOne({_id:uid});
        console.log('message deleted successfully');
    }
  
}