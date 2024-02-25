import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.admins.createMany({
            data:[
                {
                    username:'host',
                    password:hashSync("123456",3),
                    department:'director',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin01',
                    password:hashSync("123456",3),
                    department:'manager',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin02',
                    password:hashSync("123456",3),
                    department:'manager',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin03',
                    password:hashSync("123456",3),
                    department:'manager',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin04',
                    password:hashSync("123456",3),
                    department:'manager',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin05',
                    password:hashSync("123456",3),
                    department:'manager',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin06',
                    password:hashSync("123456",3),
                    department:'manager',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin07',
                    password:hashSync("123456",3),
                    department:'specialist',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin08',
                    password:hashSync("123456",3),
                    department:'specialist',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin09',
                    password:hashSync("123456",3),
                    department:'specialist',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin10',
                    password:hashSync("123456",3),
                    department:'specialist',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin11',
                    password:hashSync("123456",3),
                    department:'specialist',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin12',
                    password:hashSync("123456",3),
                    department:'specialist',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin13',
                    password:hashSync("123456",3),
                    department:'specialist',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin14',
                    password:hashSync("123456",3),
                    department:'specialist',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                },
                {
                    username:'admin15',
                    password:hashSync("123456",3),
                    department:'specialist',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                }
            ]
        })

        await prisma.users.createMany({
            data:[
                {
                    id: 1,
                    email: "rroycroft0@gmpg.org",
                    email_verify: false,
                    password: "$2a$04$PGhTLQ.15MbQJO4mPZF.hO7Hzk8sbRWi9TBq95k4BMAg6lL842WmG",
                    status: false,
                    createAt: "9/8/2023",
                    updateAt: "8/18/2023",
                    phone: "823-780-4054",
                    avatar: "https://robohash.org/magnamharumvoluptatem.png?size=50x50&set=set1"
                },
                {
                    id: 2,
                    email: "tledeker1@amazon.co.jp",
                    email_verify: true,
                    password: "$2a$04$xNRu8IJqOyIC.qEDpn7wwe1mKwMoLndxp9ZXp.uMwzxB26RTRNEly",
                    status: false,
                    createAt: "8/13/2023",
                    updateAt: "10/4/2023",
                    phone: "401-270-4588",
                    avatar: "https://robohash.org/autemestquis.png?size=50x50&set=set1"
                },
                {
                    id: 3,
                    email: "mrubinovitch2@woothemes.com",
                    email_verify: true,
                    password: "$2a$04$FdbE3M335DbfdtQgezcjr.ofMR7mtmFVZoPYtowm03UMy0Pjnb5Oa",
                    status: false,
                    createAt: "8/7/2023",
                    updateAt: "1/30/2024",
                    phone: "542-603-3548",
                    avatar: "https://robohash.org/ipsametsoluta.png?size=50x50&set=set1"
                },
                {
                    id: 4,
                    email: "cenrrico3@adobe.com",
                    email_verify: false,
                    password: "$2a$04$BDurFjjZNwXaDURtss4ia.nP3ISyfi7fpINdeh0o19gMwALpEesEC",
                    status: false,
                    createAt: "4/30/2023",
                    updateAt: "6/22/2023",
                    phone: "522-615-5720",
                    avatar: "https://robohash.org/modierroreaque.png?size=50x50&set=set1"
                },
                {
                    id: 5,
                    email: "gtapscott4@twitpic.com",
                    email_verify: true,
                    password: "$2a$04$6kQ4yOoOUqjUNz6p6lrTh.Nx6/hAun6GOeOxWuENXx.40KSxJw3Fi",
                    status: false,
                    createAt: "3/16/2023",
                    updateAt: "6/7/2023",
                    phone: "982-671-8048",
                    avatar: "https://robohash.org/itaquedignissimosiure.png?size=50x50&set=set1"
                },
                {
                    id: 6,
                    email: "cdimond5@paypal.com",
                    email_verify: false,
                    password: "$2a$04$NlKvaZfLE5u4GKnrCGvigexUnM0WyQu7HDkEz.kNMboAVXY0Es8wO",
                    status: true,
                    createAt:"8/20/2023",
                    updateAt: "11/1/2023",
                    phone: "936-164-5265",
                    avatar: "https://robohash.org/officiasedreiciendis.png?size=50x50&set=set1"
                },
                {
                    id: 7,
                    email: "astimson6@jimdo.com",
                    email_verify: false,
                    password: "$2a$04$vG9MS15rpkFYQ8vzzfnkhuQvgTiFsCn7g/Bx9O.CvOu5EZ5fYCHv6",
                    status: true,
                    createAt: "4/15/2023",
                    updateAt: "10/21/2023",
                    phone: "229-387-3658",
                    avatar: "https://robohash.org/reprehenderitrerumillum.png?size=50x50&set=set1"
                },
                {
                    id: 8,
                    email: "ngotcher7@netscape.com",
                    email_verify: true,
                    password: "$2a$04$CNAuBW7dRGAwACeDU.E4Ou0en6AdSzhe5DYmPXe8KzHP053KUvYJC",
                    status: true,
                    createAt: "11/14/2023",
                    updateAt: "4/11/2023",
                    phone: "602-416-8015",
                    avatar: "https://robohash.org/autemnumquamipsa.png?size=50x50&set=set1"
                },
                {
                    id: 9,
                    email: "atracy8@google.es",
                    email_verify: false,
                    password: "$2a$04$zhJSjZnOR0sPEJDyiROHpevvp5rwmL9R10L.2k2mJE/1SnCEKy4x2",
                    status: true,
                    createAt: "1/15/2024",
                    updateAt: "8/14/2023",
                    phone: "284-324-8118",
                    avatar: "https://robohash.org/sedipsumquisquam.png?size=50x50&set=set1"
                },
                {
                    id: 10,
                    email: "agretham9@blinklist.com",
                    email_verify: true,
                    password: "$2a$04$TekrVLYpjs2JdxAm3KrBE.CWCbR1PVpGYxQVE4XEyNEEFmsC4Y5jC",
                    status: true,
                    createAt: "12/26/2023",
                    updateAt: "9/17/2023",
                    phone: "502-908-1363",
                    avatar: "https://robohash.org/saepesitvoluptas.png?size=50x50&set=set1"
                }
            ]
        })

        await prisma.categories.createMany({
            data:[
                {
                    id:1,
                    categoryName:"Xe đạp leo núi",
                    createAt:"12/26/2023",
                    updateAt:"12/26/2023",
                    avatar:"https://robohash.org/saepesitvoluptas.png?size=50x50&set=set1"
                }
                ,
                {
                    id:2,
                    categoryName:"Xe đạp gia đình",
                    createAt:"12/6/2023",
                    updateAt:"12/26/2023",
                    avatar:"https://robohash.org/saepesitvoluptas.png?size=50x50&set=set1"
                }
                ,
                {
                    id:3,
                    categoryName:"Xe đạp người lớn",
                    createAt:"12/3/2023",
                    updateAt:"12/26/2023",
                    avatar:"https://robohash.org/saepesitvoluptas.png?size=50x50&set=set1"
                }
                ,
                {
                    id:4,
                    categoryName:"Xe đạp trẻ em",
                    createAt:"12/5/2023",
                    updateAt:"12/26/2023",
                    avatar:"https://robohash.org/saepesitvoluptas.png?size=50x50&set=set1"
                }
            ]
        })

        await prisma.products.createMany({
            data:[
                {
                    id:1,
                    productName:"Xe leo núi 1",
                    material:"inox",
                    madeBy:"england",
                    categoryId:1,
                    price:2380000,
                    brand:"hero",
                    rating:4.5,
                    createAt:"12/26/2023",
                    updateAt:"12/26/2023"
                },
                {
                    id:2,
                    productName:"Xe leo núi 2",
                    material:"inox",
                    madeBy:"england",
                    categoryId:1,
                    price:3800000,
                    brand:"hero",
                    rating:4.5,
                    createAt:"12/26/2023",
                    updateAt:"12/26/2023"
                }
                ,
                {
                    id:3,
                    productName:"Xe leo núi 3",
                    material:"inox",
                    madeBy:"england",
                    categoryId:1,
                    price:2480000,
                    brand:"hero",
                    rating:3.7,
                    createAt:"12/26/2023",
                    updateAt:"12/26/2023"
                },
                {
                    id:4,
                    productName:"Xe gia đình 1",
                    material:"inox",
                    madeBy:"england",
                    categoryId:2,
                    price:2580000,
                    brand:"hero",
                    rating:3.7,
                    createAt:"12/26/2023",
                    updateAt:"12/26/2023"
                },
                {
                    id:5,
                    productName:"Xe gia đình 2",
                    material:"inox",
                    madeBy:"hongkong",
                    categoryId:2,
                    price:12380000,
                    brand:"jett",
                    rating:3.7,
                    createAt:"12/26/2023",
                    updateAt:"12/26/2023"
                },
                {
                    id:6,
                    productName:"Xe gia đình 3",
                    material:"inox",
                    madeBy:"hongkong",
                    categoryId:2,
                    price:23820000,
                    brand:"jett",
                    rating:3.7,
                    createAt:"12/26/2023",
                    updateAt:"12/26/2023"
                },
                {
                    id:7,
                    productName:"Xe người lớn 1",
                    material:"aluminum",
                    madeBy:"japan",
                    categoryId:3,
                    price:3380000,
                    brand:"jett",
                    rating:4.5,
                    createAt:"12/26/2023",
                    updateAt:"12/26/2023"
                },
                {
                    id:8,
                    productName:"Xe người lớn 2",
                    material:"other",
                    madeBy:"japan",
                    categoryId:3,
                    price:23800500,
                    brand:"jett",
                    rating:4.5,
                    createAt:"12/26/2023",
                    updateAt:"12/26/2023"
                },
                {
                    id:9,
                    productName:"Xe người lớn 3",
                    material:"aluminum",
                    madeBy:"japan",
                    categoryId:3,
                    price:2780000,
                    brand:"fonix",
                    rating:4.5,
                    createAt:"12/26/2023",
                    updateAt:"12/26/2023"
                },
                {
                    id:10,
                    productName:"Xe trẻ em 1",
                    material:"aluminum",
                    madeBy:"japan",
                    categoryId:4,
                    price:2330000,
                    brand:"fonix",
                    rating:4.5,
                    createAt:"12/26/2023",
                    updateAt:"12/26/2023"
                },
                {
                    id:11,
                    productName:"Xe trẻ em 2",
                    material:"inox",
                    madeBy:"hongkong",
                    categoryId:4,
                    price:4380000,
                    brand:"fonix",
                    rating:4.5,
                    createAt:"12/26/2023",
                    updateAt:"12/26/2023"
                },
                {
                    id:12,
                    productName:"Xe trẻ em 3",
                    material:"inox",
                    madeBy:"china",
                    categoryId:4,
                    price:5380000,
                    brand:"giant",
                    rating:4.5,
                    createAt:"12/26/2023",
                    updateAt:"12/26/2023"
                }
            ]
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