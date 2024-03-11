import { Inject, Injectable, OnModuleInit, forwardRef } from "@nestjs/common";
import { ChannelType, Client, GatewayIntentBits, Guild, Message, TextChannel } from "discord.js";
import { ChatGateway } from "./chat.gateway";

@Injectable()
export class DiscordService implements OnModuleInit {
    botToken: string = "MTIxNjM3NzYzODgyMjg3NTE4Nw.GCcKLK.Inv8E5UjLU6cCnRSoywvsz5aoH3AR8tP7eEZAI";
    guildId: string = "1214930497613070366"
    /* Bot */
    client: Client;
    /* Guild */
    guild: Guild;

    constructor(@Inject(forwardRef(() => ChatGateway)) private readonly chatService: ChatGateway) { }

    onModuleInit() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
        })

        this.client.login(this.botToken)

        this.client.on("ready", () => {
            this.guild = this.client.guilds.cache.get(this.guildId)


            this.client.on("messageCreate", (message: Message) => {
                if (!message.author.bot) {
                    this.chatService.sendMessageToUser(String((message.channel as TextChannel).name), message.content)
                }
            })
        })
    }

    async createChannel(channelName: string): Promise<TextChannel> {
        return await this.guild.channels.create({
            type: ChannelType.GuildText,
            name: channelName
        })
    }

    async getTextChannel(channelId: string): Promise<TextChannel> {
        return (this.guild.channels.cache.get(channelId) as TextChannel)
    }
} 