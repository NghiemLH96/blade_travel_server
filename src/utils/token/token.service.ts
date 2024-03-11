import { sign , verify } from "jsonwebtoken"
import { Injectable } from "@nestjs/common"

@Injectable()
export class tokenService {
    createToken = (data:object, time:string):string=>{
        let token = sign(data,process.env.PRIVATE_KEY,{expiresIn:time})
        return token
    }
    verify = (token:string):any => {
        try {
            let userDetail = verify(token , process.env.PRIVATE_KEY)
             
            return userDetail
        } catch (error) {
            return false
        }
    }
}