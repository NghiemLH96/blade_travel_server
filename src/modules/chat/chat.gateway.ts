import { Inject, OnModuleInit, forwardRef } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { DiscordService } from "./discord.service";

interface Client {
    guestId: string;
    guestName: string;
    sockets: Socket[]
}

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnModuleInit {

    clientList: Client[] = [];

    @WebSocketServer()
    socketServer: Socket

    constructor(
        private chatService: ChatService,
        @Inject(forwardRef(() => DiscordService))
        private readonly discordService: DiscordService
        ) { }

    onModuleInit() {
        this.socketServer.on('connection', (socketClient: Socket) => {
            let { guestName, guestId } = socketClient.handshake.query;
            this.addClient(guestName, guestId, socketClient)

            socketClient.on('user-send-message', (data: {
                guestId: string;
                content: string;
            }) => {
                this.userSendMessage(data)
            })

            socketClient.on('disconnect', () => {
                let client = this.clientList.find(client => client.guestId == guestId)
                if (client) {
                    client.sockets = client.sockets.filter(socketItem => socketItem.id != socketClient.id)
                    if (client.sockets.length == 0) {
                        this.clientList = this.clientList.filter(clientF => clientF.guestId != guestId)
                    }
                }
            })
        })
    }

    addClient(guestName: any, guestId: any, socketClient: Socket) {
        if(!guestName) {
            socketClient.emit('connect-status', {
                status: false,
                message: "Guest Chưa Được ĐỊnh Dạng"
            })
            socketClient.disconnect();
        }
        let client = this.clientList.find(clientF => clientF.guestId == guestId);
        if (client) {
            /* đã từng kết nối */
            client.sockets.push(socketClient)
        } else {
            /* chưa từng */
            this.clientList.push({
                guestId,
                guestName,
                sockets: [
                    socketClient
                ]
            })
        }
        this.loadChatHistory(guestId)
    }

    async loadChatHistory(guestId: string) {
        try {
            let client = this.clientList.find(clientF => clientF.guestId == guestId);
            let {err, data} = await this.chatService.findHistoryByGuestId(guestId)

            client.sockets.forEach(socket => {
                socket.emit('load-chat-history', data)
            })

            if(err) throw {
                message: "Không tìm thấy guest"
            }
        }catch(err) {}
    }

    async userSendMessage(dataPa: {
        guestId: string;
        content: string;
    }) {
       try {
        let client = this.clientList.find(clientF => clientF.guestId == dataPa.guestId);
        
        let {err, data} = await this.chatService.findHistoryByGuestId(dataPa.guestId);
        if(data.length > 0) {
            let discordTextChannelId = data[0].discordTextChannelId;
            await this.chatService.createChat({
                content: dataPa.content,
                createAt: String(Date.now()),
                updateAt:String(Date.now()),
                discordTextChannelId: discordTextChannelId,
                guestId: dataPa.guestId,
                guestName: client.guestName,
            })
            let textChannel = await this.discordService.getTextChannel(discordTextChannelId)
            textChannel.send(`Người Dùng ${client.guestName}: ${dataPa.content}`)
            this.loadChatHistory(client.guestId)
            
        }else {
            let textChannel = await this.discordService.createChannel(dataPa.guestId)
            await this.chatService.createChat({
                content: dataPa.content,
                createAt: String(Date.now()),
                updateAt:String(Date.now()),
                discordTextChannelId: textChannel.id,
                guestId: dataPa.guestId,
                guestName: client.guestName,
            })
            textChannel.send(`Người Dùng ${client.guestName}: ${dataPa.content}`)
            this.loadChatHistory(client.guestId)
        }
       }catch(err) {

       }
    }

    async sendMessageToUser(guestId: string, content: string) {
       try {
        let client = this.clientList.find(clientF => clientF.guestId == guestId);
        let {err, data} = await this.chatService.findHistoryByGuestId(guestId);
        let discordTextChannelId = data[0].discordTextChannelId;
        await this.chatService.createChat({
            content,
            createAt: String(Date.now()),
            updateAt:String(Date.now()),
            discordTextChannelId: discordTextChannelId,
            guestId,
            guestName: data[0].guestName,
            adminId: "1"
        })
       if(client) {
              this.loadChatHistory(guestId)
       }
       }catch(err) {

       }
    }
}