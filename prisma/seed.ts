import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.admins.create({
            data:{
                username:'host',
                password:hashSync("123456",3),
                department:'director',
                createAt:String(Date.now()),
                updateAt:String(Date.now())
            }
        })
    } catch (error) {
        
    }
}

main()
.then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })