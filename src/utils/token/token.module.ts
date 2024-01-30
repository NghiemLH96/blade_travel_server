import { tokenService } from "./token.service";
import { Module, Global } from "@nestjs/common";

@Global()
@Module({
    providers:[tokenService],
    exports:[tokenService]
})
export class tokenModule{}