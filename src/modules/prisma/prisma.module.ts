import { Module , Global } from "@nestjs/common";
import PrismaService from "./prisma.service";

@Global()
@Module({
    controllers: [],
    exports: [PrismaService],
    providers: [PrismaService],
})
export default class PrismaModule{}