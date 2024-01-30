import { mailService } from "./mailer.service";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
    providers:[
        mailService
    ],
    exports:[
        mailService
    ]
})
export class mailModule {}