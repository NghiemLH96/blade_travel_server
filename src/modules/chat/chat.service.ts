import { Injectable } from "@nestjs/common";
import { PrismaClient, chat } from "@prisma/client";
const prisma = new PrismaClient();

interface newChat {
    guestId: string;
    content: string;
    imgUrl?: string;
    videoUrl?: string;
    link?: string;
    createAt: string;
    updateAt: string;
    discordTextChannelId: string;
    guestName: string;
    guestFbUrl?: string;
    guestNumberPhone?: string;
    adminId?: string;
}

@Injectable()
export class ChatService {
    constructor(){}

    async findHistoryByGuestId(guestId: string) {
        try {
            let messages = await prisma.chat.findMany({
                where: {
                 guestId
                }
            })
            return {
                data: messages
            }
        }catch(err) {
            return {
                err
            }
        }
    }

    async createChat(data: newChat) {
        try {
            let message = await prisma.chat.create({
                data
            })
            return {
                data: message
            }
        }catch(err) {
            return {
                err
            }
        }
    }
}