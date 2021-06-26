import {Logger} from 'telegram/extensions';
import {TelegramClient} from 'telegram';
import {StringSession} from 'telegram/sessions';
import {NewMessage} from 'telegram/events';
import {NewMessageEvent} from 'telegram/events/NewMessage';
import {Message} from 'telegram/tl/custom/message';
import {Api} from "telegram"
import * as define from "telegram/define"
import * as reResults from "./rewriteresults"
import BigInt from "big-integer"
import { computeCheck } from "telegram/Password";

let client:any

export class tele {
  /**
   * Generate simple method from raw api gramjs 
   * parameters : 
   * tgclient : gramjs client
  */
  constructor(tgclient:any){
    client = tgclient
  }
  /**
   * class sendMessage 
   * Sends a message to a chat 
   * parameters :
   * chat_id : chat or channel or groups id. 
   * text : text or message to send. 
   * more : gramjs SendMessage params.
   * results : 
   * ClassResultSendMessage
  */
  async sendMessage(chat_id:number|string,text:string,more?:any|undefined){
      let parseMode = "markdown"
      if(more){
        if(more.parseMode){
          parseMode = more.parseMode.toLowerCase()
          delete more.parseMode
        }
      }
      let [parseText,entities] = await client._parseMessageText(text,parseMode)
      if(more){
        if(more.entities){
          entities = more.entities
          parseText = text
        }
      }
      return new reResults.ClassResultSendMessage(
        await client.invoke(
          new Api.messages.SendMessage({
              peer : chat_id,
              message : parseText,
              randomId : BigInt(-Math.floor(Math.random() * 10000000000000)),
              entities : entities,
              ...more
            })
        )
       )
    }
  /**
   * class deleteMessages 
   * Delete messages in a chat/channel/supergroup 
   * parameters :
   * chat_id : chat or Channel or groups id 
   * message_id : array of number message id to be deleted.
   * results :
   * ClassResultDeleteMessage
  */
  async deleteMessages(chat_id:number|string,message_id:number[]){
    let type = await client.getEntity(chat_id)
    if(type.className == "Channel"){
      return new reResults.ClassResultDeleteMessage(
         await client.invoke(
          new Api.channels.DeleteMessages({
            channel: chat_id,
            id: message_id,
          })
        )
      )
    }else{
      return new reResults.ClassResultDeleteMessage(
        await client.invoke(
          new Api.messages.DeleteMessages({
           revoke: true,
           id: message_id,
         })
        )
       )
    }
  }
  /**
   * class editMessage 
   * Edit message 
   * chat_id : chat or channel or groups id. 
   * message_id : id from message to be edited.
   * text : new message if you need to edit media you can replace this with blank string ("")
   * more : gramjs EditMessage params.
   * results : 
   * ClassResultEditMessage
  */
  async editMessage(chat_id:number|string,message_id:number,text:string,more?:any|undefined){
    let parseMode = "markdown"
      if(more){
        if(more.parseMode){
          parseMode = more.parseMode.toLowerCase()
          delete more.parseMode
        }
      }
    let [parseText,entities] = await client._parseMessageText(text||"",parseMode)
    if(more){
      if(more.entities){
        entities = more.entities
        parseText = text || ""
      }
    }
    return new reResults.ClassResultEditMessage(
      await client.invoke(
        new Api.messages.EditMessage({
          peer: chat_id,
          id: message_id,
          message: parseText,
          entities : entities,
          ...more
        })
      )
    )
  }
  /**
   * class forwardMessages.
   * Forwards messages by their IDs.
   * parameters : 
   * chat_id : chat or channel or groups id to be sending forwardMessages (receiver).
   * from_chat_id : chat or channel or groups id which will forwarding messages  (sender).
   * message_id : array of number message id to be forward. 
   * more : gramjs ForwardMessages params.
   * results : 
   * ClassResultForwardMessages
  */
  async forwardMessages(chat_id:number|string,from_chat_id:number|string,message_id:number[],more?:any|undefined){
    let randomId:any = []
    for(let i = 0; i < message_id.length;i++){
      randomId.push(BigInt(Math.floor(Math.random() * 10000000000000)))
    }
    return new reResults.ClassResultForwardMessages(
        await client.invoke(
          new Api.messages.ForwardMessages({
            fromPeer : from_chat_id,
            toPeer : chat_id,
            id : message_id,
            randomId : randomId,
            ...more
        })
      )
    )
  }
  /**
   * class getMessages 
   * Get chat/channel/supergroup messages.
   * parameters :
   * chat_id : chat or channel or groups id.
   * message_id : array of number message id. 
   * results : 
   * ClassResultGetMessages
  */
  async getMessages(chat_id:number|string,message_id:any[]){
    let type = await client.getEntity(chat_id)
    if(type.className == "Channel"){
      return new reResults.ClassResultGetMessages(
          await client.invoke(new Api.channels.GetMessages({
          channel : chat_id,
          id : message_id
        }))
      )
    }else{
      return new reResults.ClassResultGetMessages(
          await client.invoke(new Api.messages.GetMessages({
          id : message_id
        }))
      )
    }
  }
  /**
   * class getMessagesViews. 
   * Get and increase the view counter of a message sent or forwarded from a channel.
   * parameters : 
   * chat_id : channel id.
   * message_id : array of message id. 
   * increment : Whether to mark the message as viewed and increment the view counter.
   * results : 
   * ClassResultGetMessagesViews
  */
  async getMessagesViews(chat_id:number|string,message_id:number[],increment:boolean=false){
    return new reResults.ClassResultGetMessagesViews(
      await client.invoke(new Api.messages.GetMessagesViews({
        peer : chat_id,
        id : message_id,
        increment : increment
      }))
    )
  }
  async getUserPhotos(chat_id:number|string,more?:any|undefined){
    return client.invoke(
        new Api.photos.GetUserPhotos({
          userId : chat_id,
          ...more
        })
      )
  }
  async readHistory(chat_id:number|string,more?:any|undefined){
    return client.invoke(
        new Api.messages.ReadHistory({
          peer : chat_id,
          ...more
        })
      )
  }
  async readMentions(chat_id:number|string){
    return client.invoke(
        new Api.messages.ReadMentions({
          peer : chat_id
        })
      )
  }
  async readMessageContents(message_id:number[]){
    return client.invoke(
        new Api.messages.ReadMessageContents({
          id : message_id
        })
      )
  }
  async receivedMessages(max_id:number){
    return client.invoke(
        new Api.messages.ReceivedMessages({
          maxId : max_id
        })
      )
  }
  async search(chat_id:number|string,query:string,more?:any|undefined){
    return client.invoke(
        new Api.messages.Search({
          peer : chat_id,
          q : query,
          ...more
        })
      )
  }
  async searchGlobal(query:string,more?:any|undefined){
    return client.invoke(
        new Api.messages.SearchGlobal({
          q : query,
          ...more
        })
      )
  }
  async unpinAllMessages(chat_id:number|string){
    return client.invoke(
        new Api.messages.UnpinAllMessages({
          peer : chat_id
        })
      )
  }
  async pinMessage(chat_id:number|string,message_id:number,more?:any|undefined){
    return client.invoke(
        new Api.messages.UpdatePinnedMessage({
          peer:chat_id,
          id:message_id,
          ...more
        })
      )
  }
  async createChannel(title:string,about:string,more?:any|undefined){
    return client.invoke(
        new Api.channels.CreateChannel({
          title : title,
          about : about,
          ...more
        })
      )
  }
  async deleteChannel(chat_id:number|string){
    return client.invoke(
        new Api.channels.DeleteChannel({
          channel : chat_id
        })
      )
  }
  async deleteHistory(chat_id:number|string,more?:any|undefined){
    let type = await client.getEntity(chat_id)
    if(type.className == "Channel"){
      return client.invoke(
        new Api.channels.DeleteHistory({
          channel : chat_id,
          ...more
        })
      )
    }else{
      return client.invoke(
          new Api.messages.DeleteHistory({
            peer : chat_id
          })
        )
    }
  }
  async deleteUserHistory(chat_id:number|string,user_id:number|string){
    return client.invoke(
        new Api.channels.DeleteUserHistory({
          channel : chat_id,
          userId : user_id
        })
      )
  }
  /**
   * class editAdmin 
   * Modify the admin rights of a user in a supergroup/channel.
   * parameters : 
   * chat_id : channel or groups id 
   * user_id : id from user which will modify the admin rights
   * more : adminRights params and rank params.
  */
  async editAdmin(chat_id:number|string,user_id:number|string,more?:any|undefined){
    let permissions = {
      changeInfo: more?.changeInfo || true,
      postMessages: more?.postMessages || true,
      editMessages: more?.editMessages || true,
      deleteMessages: more?.deleteMessages || true,
      banUsers: more?.banUsers || true,
      inviteUsers: more?.inviteUsers || true,
      pinMessages: more?.pinMessages || true,
      addAdmins: more?.addAdmins || false,
      anonymous: more?.anonymous || false,
      manageCall: more?.manageCall ||true
    }
    return client.invoke(
        new Api.channels.EditAdmin({
          channel : chat_id,
          userId : user_id,
          adminRights : new Api.ChatAdminRights(permissions),
          rank : more?.rank || false
        })
      )
  }
  /**
   * class editBanned
   * Ban/unban/kick a user in a supergroup/channel.
   * parameters : 
   * chat_id : channel or groups id 
   * user_id : id from user which will banned/kicked/unbanned 
   * more : permissions given to the user
  */
  async editBanned(chat_id:number|string,user_id:number|string,more?:any|undefined){
    let permissions = {
      untilDate: more?.untilDate || 0,
      viewMessages: more?.viewMessages || true,
      sendMessages: more?.sendMessages || true,
      sendMedia: more?.sendMedia || true,
      sendStickers: more?.sendStickers || true,
      sendGifs: more?.sendGifs || true,
      sendGames: more?.sendGames || true,
      sendInline: more?.sendInline || true,
      sendPolls: more?.sendPolls || true,
      changeInfo: more?.changeInfo || true,
      inviteUsers: more?.inviteUsers || true,
      pinMessages: more?.pinMessages || true
    }
    return client.invoke(
        new Api.channels.EditBanned({
          channel : chat_id,
          participant : user_id,
          bannedRights : new Api.ChatBannedRights(permissions)
        })
      )
  }
  /**
   * class editCreator 
   * Transfer channel ownership.
   * parameters : 
   * chat_id : channel or groups id 
   * user_id : New channel owner 
   * password : 2fa password 
  */
  async editCreator(chat_id:number|string,user_id:number|string,password:string){
    let pwd:Api.account.Password = await client.invoke(new Api.account.GetPassword())
    let passSrp = await computeCheck(pwd,password)
    return client.invoke(
        new Api.channels.EditCreator({
            channel : chat_id,
            userId : user_id,
            password : passSrp
          })
      )
  }
}