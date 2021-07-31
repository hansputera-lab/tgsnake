// Tgsnake - Telegram MTProto framework developed based on gram.js.
// Copyright (C) 2021 Butthx <https://guthub.com/butthx>
// 
// This file is part of Tgsnake
// 
// Tgsnake is a free software : you can redistribute it and/or modify
//  it under the terms of the MIT License as published.

import * as Interface from "./interface"
import {Api} from "telegram"
import {BigInteger} from "big-integer"
import {FileId} from "tg-file-id"
export class Message implements Interface.Message {
  id!:number;
  chat:Interface.Chat;
  from:Interface.From;
  text?:string;
  entities?:Api.TypeMessageEntity;
  replyToMessageId?:number;
  date:Date|number;
  media?:Api.TypeMessageMedia|Media
  /**
   * rewrite json from incoming message. 
   * original message can be found in bot.event.message.
  */
  constructor(event?:any){
    let message = event.message
    /**
     * message id from incoming new message
    */
   this.id = message.id
   /**
    * class chatClass
   */
   this.chat = new Chat(message,event)
   /**
    * class fromClass
   */
   this.from = new From(message,event)
   /**
    * date of sending message
   */
   this.date = message.date || Date.now() / 1000
   /**
    * if user sending text with entities (bold/italic/etc..) this object will showing.
   */
   if(message.entities){
    this.entities = message.entities
   }
   /**
    * message_id if user reply some message.
   */
   if(message.replyTo !== null){
     if(message.replyTo.replyToMsgId){
      this.replyToMessageId = message.replyTo.replyToMsgId
     }
   }
   /**
    * if user sending message this object will showing
   */
   if(message.message){
     this.text = message.message
   } 
   /**
    * if user sending media this object will showing.
   */
   if(message.media){
     let convert = new Media(message.media) 
     if(convert.type){ 
       this.media = convert 
     }else{
       this.media = message.media
     }
   }
  }
}
class Chat implements Interface.Chat {
  id!:number;
  title?:string;
  first_name?:string;
  last_name?:string;
  username?:string;
  private?:boolean|string;
  /**
   * To generate new json from `message.chat`
  */
  constructor(message?:any,event?:any){
    if(message.chat){
      /**
       * Generate chatId. 
       * If chat id == undefined this constructor don't have chatId 
       * use this chat id to call telegram api.
      */
      if(message.chat.id){
        this.id = message.chat.id
      }
      /**
       * Generate Title of chat 
       * title of groups or channel when nee message comming.
      */
      if(message.chat.title){
        this.title = message.chat.title
      }
      /**
       * Generate First Name (private chat)
       * first name from user when user sending message in private chat
      */
      if(message.chat.firstName){
        this.first_name = message.chat.firstName
      }
      /**
       * Generate Last Name (private chat)
       * last name from user when user sending message in private chat
      */
      if(message.chat.lastName){
        this.last_name = message.chat.lastName
      }
      /**
       *  Generate Username 
       * username from chat (groups/channel/user)
      */
      if(message.chat.username){
        this.username = message.chat.username
      }
    }else{
      /**
       * if message.chat.id not found change with this
      */
      if(message.senderId){
        this.id = message.senderId
      }
    }
    /**
     * Generate typeof chat (private/groups)
     * where user sending messsage.
    */
    this.private = event.isPrivate || false
  }
}
class From implements Interface.From {
  id!:number;
  first_name?:string;
  last_name?:string;
  username?:string;
  deleted?:boolean;
  restricted?:boolean;
  lang?:string;
  status?:string;
  /**
   * To generate json from `message.sender`
  */
  constructor(message?:any,event?:any){
    if(message.sender){
      /**
       * Generate userId 
       * userId is id when user sends message to group/private chat
      */
      if(message.sender.id){
        this.id = message.sender.id
      }
      /**
       * Generate First Name 
       * firstName from user when sending message
      */
      if(message.sender.firstName){
        this.first_name = message.sender.firstName
      }
      /**
       * Generate Last Name 
       * lastName from user when sending message
      */
      if(message.sender.lastName){
        this.last_name = message.sender.lastName
      }
      /**
       * Generate username 
       * firstName from user when sending message
      */
      if(message.sender.username){
        this.username = message.sender.username
      }
      /**
       *  if user delete account this object will showing
      */
      if(message.sender.deleted){
        this.deleted = message.sender.deleted
      }
      /**
       *  if user restricted this object will showing
      */
      if(message.sender.restricted){
        this.restricted = message.sender.restricted
      }
      /**
       * language used by user
      */
      if(message.sender.langCode){
        this.lang = message.sender.langCode
      }
      /**
       * Last seen from user 
      */
      if(message.sender.status){
        if(message.sender.status.className){
          this.status = message.sender.status.className
        }
      }
    }else{
      /**
       * if message.sender.id not found change with this
      */
      if(message.senderId){
        this.id = message.senderId
      }
    }
  }
}
let typeId = {
  THUMBNAIL : 0,
  CHAT_PHOTO : 1,  // ProfilePhoto
  PHOTO : 2,
  VOICE : 3,  // VoiceNote
  VIDEO : 4,
  DOCUMENT : 5,
  ENCRYPTED : 6,
  TEMP : 7,
  STICKER : 8,
  AUDIO : 9,
  ANIMATION : 10,
  ENCRYPTED_THUMBNAIL : 11,
  WALLPAPER : 12,
  VIDEO_NOTE : 13,
  SECURE_RAW : 14,
  SECURE : 15,
  BACKGROUND : 16,
  DOCUMENT_AS_FILE : 17
}
let thumbTypeId = {
  LEGACY : 0,
  THUMBNAIL : 1,
  CHAT_PHOTO_SMALL : 2,  //DialogPhotoSmall
  CHAT_PHOTO_BIG : 3,  // DialogPhotoBig
  STICKER_SET_THUMBNAIL : 4
}
export class Media {
  type?:string; 
  fileId!:string; 
  uniqueFileId!:string;
  fileName?:string
  constructor(media:Api.TypeMessageMedia){
    if(media instanceof Api.MessageMediaDocument){
      if((media.document) instanceof Api.Document){
        let doc = (media.document) as Api.Document
        switch(doc.mimeType){
          case "image/webp":
            this.type = "sticker";
            for(let i=0; i < doc.attributes.length; i++){
              if(doc.attributes[i] instanceof Api.DocumentAttributeFilename){
                let daf = doc.attributes[i] as Api.DocumentAttributeFilename;
                this.fileName = daf.fileName;
                break;
              }
            }
            let fId = generateFileId({
              version : 4,
              subVersion : 30,
              dcId : doc.dcId,
              fileType : "sticker",
              id : doc.id,
              accessHash : doc.accessHash,
              typeId : typeId.STICKER,
              fileReference : doc.fileReference.toString("hex")
            })
            this.fileId = fId.fileId 
            this.uniqueFileId = fId.uniqueFileId
            break; 
          default:
        }
      }
    }
  }
}
interface generateFileId {
  version: number;
  subVersion: number;
  dcId: number;
  fileType: string | number;
  id: bigint | BigInteger;
  accessHash: bigint | BigInteger;
  typeId: number;
  fileReference: string;
  url?: string;
  volumeId?: number | bigint;
  localId?: number ;
  photoSizeSource?: 'legacy' | 'thumbnail' | 'dialogPhoto' | 'stickerSetThumbnail';
  photoSizeSourceId?: number;
  secret?: number;
  dialogId?: number;
  dialogAccessHash?: number;
  isSmallDialogPhoto?: boolean;
  stickerSetId?: number ;
  stickerSetAccessHash?: number;
  thumbType?: string;
  thumbTypeId?: number;
}
function generateFileId(medias:generateFileId){
  let file = new FileId() 
  for(let [key,value] of Object.entries(medias)){
      if(key == "id" || key == "accessHash" || key == "secret"){
        file[key] = BigInt(String(value).replace("-",""))
      }else{
        file[key] = value
      }
  }
  let file_id = file.toFileId()
  let unfId = file.toFileUniqId()
  return {
    fileId : file_id,
    uniqueFileId : unfId
  }
}