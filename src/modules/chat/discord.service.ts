import { Inject, Injectable, OnModuleInit, forwardRef } from "@nestjs/common";
import { ChannelType, Client, GatewayIntentBits, Guild, Message, TextChannel } from "discord.js";
import { ChatGateway } from "./chat.gateway";

@Injectable()
export class DiscordService implements OnModuleInit {
    botToken: string = process.env.BOTTOKEN;
    guildId: string = process.env.DISCORD_CHANNEL_ID
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
            console.log("Bot đã đăng nhập thành công!")
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