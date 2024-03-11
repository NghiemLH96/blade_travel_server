import { Module } from "@nestjs/common";
import {ChatGateway} from "./chat.gateway";
import { ChatService } from "./chat.service";
import { DiscordService } from "./discord.service";

@Module({
    providers: [ChatGateway, ChatService, DiscordService]
})
export  class ChatModule {}