import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.departments.createMany({
            data: [{
                id: 1,
                department: "Giám đốc",
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                id: 2,
                department: "Quản lý",
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                id: 3,
                department: "Quản trị viên",
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }]
        })

        await prisma.admins.createMany({
            data: [
                {
                    username: 'host',
                    password: hashSync("123456", 3),
                    department: 1,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin01',
                    password: hashSync("123456", 3),
                    department: 2,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin02',
                    password: hashSync("123456", 3),
                    department: 2,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin03',
                    password: hashSync("123456", 3),
                    department: 2,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin04',
                    password: hashSync("123456", 3),
                    department: 2,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin05',
                    password: hashSync("123456", 3),
                    department: 2,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin06',
                    password: hashSync("123456", 3),
                    department: 2,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin07',
                    password: hashSync("123456", 3),
                    department: 3,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin08',
                    password: hashSync("123456", 3),
                    department: 3,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin09',
                    password: hashSync("123456", 3),
                    department: 3,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin10',
                    password: hashSync("123456", 3),
                    department: 3,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin11',
                    password: hashSync("123456", 3),
                    department: 3,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin12',
                    password: hashSync("123456", 3),
                    department: 3,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin13',
                    password: hashSync("123456", 3),
                    department: 3,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin14',
                    password: hashSync("123456", 3),
                    department: 3,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin15',
                    password: hashSync("123456", 3),
                    department: 3,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                }
            ]
        })

        await prisma.brands.createMany({
            data: [{
                brandName: 'Jett',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                brandName: 'Giant',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                brandName: 'Life',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                brandName: 'Fonix',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                brandName: 'Hitasa',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                brandName: 'Hero',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                brandName: 'Khác',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }]
        })

        await prisma.material.createMany({
            data: [{
                material: 'Inox',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                material: 'Nhôm',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                material: 'Khác',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }]
        })

        await prisma.madeBy.createMany({
            data: [{
                country: 'Anh',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                country: 'Trung Quốc',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                country: 'Hong Kong',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                country: 'Đài Loan',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                country: 'Việt Nam',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                country: 'Nhật Bản',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                country: 'Khác',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }]
        })

        await prisma.users.createMany({
            data: [
                {
                    email: "rroycroft0@gmpg.org",
                    email_verify: false,
                    password: "$2a$04$PGhTLQ.15MbQJO4mPZF.hO7Hzk8sbRWi9TBq95k4BMAg6lL842WmG",
                    status: false,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    phone: "823-780-4054",
                    avatar: "https://robohash.org/magnamharumvoluptatem.png?size=50x50&set=set1"
                },
                {
                    email: "tledeker1@amazon.co.jp",
                    email_verify: true,
                    password: "$2a$04$xNRu8IJqOyIC.qEDpn7wwe1mKwMoLndxp9ZXp.uMwzxB26RTRNEly",
                    status: false,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    phone: "401-270-4588",
                    avatar: "https://robohash.org/autemestquis.png?size=50x50&set=set1"
                },
                {
                    email: "mrubinovitch2@woothemes.com",
                    email_verify: true,
                    password: "$2a$04$FdbE3M335DbfdtQgezcjr.ofMR7mtmFVZoPYtowm03UMy0Pjnb5Oa",
                    status: false,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    phone: "542-603-3548",
                    avatar: "https://robohash.org/ipsametsoluta.png?size=50x50&set=set1"
                },
                {
                    email: "cenrrico3@adobe.com",
                    email_verify: false,
                    password: "$2a$04$BDurFjjZNwXaDURtss4ia.nP3ISyfi7fpINdeh0o19gMwALpEesEC",
                    status: false,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    phone: "522-615-5720",
                    avatar: "https://robohash.org/modierroreaque.png?size=50x50&set=set1"
                },
                {
                    email: "gtapscott4@twitpic.com",
                    email_verify: true,
                    password: "$2a$04$6kQ4yOoOUqjUNz6p6lrTh.Nx6/hAun6GOeOxWuENXx.40KSxJw3Fi",
                    status: false,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    phone: "982-671-8048",
                    avatar: "https://robohash.org/itaquedignissimosiure.png?size=50x50&set=set1"
                },
                {
                    email: "cdimond5@paypal.com",
                    email_verify: false,
                    password: "$2a$04$NlKvaZfLE5u4GKnrCGvigexUnM0WyQu7HDkEz.kNMboAVXY0Es8wO",
                    status: true,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    phone: "936-164-5265",
                    avatar: "https://robohash.org/officiasedreiciendis.png?size=50x50&set=set1"
                },
                {
                    email: "astimson6@jimdo.com",
                    email_verify: false,
                    password: "$2a$04$vG9MS15rpkFYQ8vzzfnkhuQvgTiFsCn7g/Bx9O.CvOu5EZ5fYCHv6",
                    status: true,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    phone: "229-387-3658",
                    avatar: "https://robohash.org/reprehenderitrerumillum.png?size=50x50&set=set1"
                },
                {
                    email: "ngotcher7@netscape.com",
                    email_verify: true,
                    password: "$2a$04$CNAuBW7dRGAwACeDU.E4Ou0en6AdSzhe5DYmPXe8KzHP053KUvYJC",
                    status: true,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    phone: "602-416-8015",
                    avatar: "https://robohash.org/autemnumquamipsa.png?size=50x50&set=set1"
                },
                {
                    email: "atracy8@google.es",
                    email_verify: false,
                    password: "$2a$04$zhJSjZnOR0sPEJDyiROHpevvp5rwmL9R10L.2k2mJE/1SnCEKy4x2",
                    status: true,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    phone: "284-324-8118",
                    avatar: "https://robohash.org/sedipsumquisquam.png?size=50x50&set=set1"
                },
                {
                    email: "agretham9@blinklist.com",
                    email_verify: true,
                    password: "$2a$04$TekrVLYpjs2JdxAm3KrBE.CWCbR1PVpGYxQVE4XEyNEEFmsC4Y5jC",
                    status: true,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    phone: "502-908-1363",
                    avatar: "https://robohash.org/saepesitvoluptas.png?size=50x50&set=set1"
                }
            ]
        })

        await prisma.categories.createMany({
            data: [
                {
                    categoryName: "Xe đạp leo núi",
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),

                }
                ,
                {
                    categoryName: "Xe đạp gia đình",
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),

                }
                ,
                {
                    categoryName: "Xe đạp người lớn",
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),

                }
                ,
                {
                    categoryName: "Xe đạp trẻ em",
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),

                }
            ]
        })

        await prisma.products.createMany({
            data: [
                {
                    productName: "Xe leo núi 1",
                    material: 1,
                    madeBy: 1,
                    categoryId: 1,
                    price: 2380000,
                    brand: 6,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar:"https://robohash.org/autemestquis.png?size=50x50&set=set1"
                },
                {
                    productName: "Xe leo núi 2",
                    material: 1,
                    madeBy: 1,
                    categoryId: 1,
                    price: 3800000,
                    brand: 6,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar:"https://robohash.org/autemestquis.png?size=50x50&set=set1"
                }
                ,
                {
                    productName: "Xe leo núi 3",
                    material: 1,
                    madeBy: 1,
                    categoryId: 1,
                    price: 2480000,
                    brand: 6,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar:"https://robohash.org/autemestquis.png?size=50x50&set=set1"
                },
                {
                    productName: "Xe gia đình 1",
                    material: 1,
                    madeBy: 1,
                    categoryId: 2,
                    price: 2580000,
                    brand: 6,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar:"https://robohash.org/autemestquis.png?size=50x50&set=set1"
                },
                {
                    productName: "Xe gia đình 2",
                    material: 1,
                    madeBy: 3,
                    categoryId: 2,
                    price: 12380000,
                    brand: 1,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar:"https://robohash.org/autemestquis.png?size=50x50&set=set1"
                },
                {
                    productName: "Xe gia đình 3",
                    material: 1,
                    madeBy: 3,
                    categoryId: 2,
                    price: 23820000,
                    brand: 1,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar:"https://robohash.org/autemestquis.png?size=50x50&set=set1"
                },
                {
                    productName: "Xe người lớn 1",
                    material: 2,
                    madeBy: 6,
                    categoryId: 3,
                    price: 3380000,
                    brand: 1,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar:"https://robohash.org/autemestquis.png?size=50x50&set=set1"
                },
                {
                    productName: "Xe người lớn 2",
                    material: 3,
                    madeBy: 6,
                    categoryId: 3,
                    price: 23800500,
                    brand: 1,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar:"https://robohash.org/autemestquis.png?size=50x50&set=set1"
                },
                {
                    productName: "Xe người lớn 3",
                    material: 2,
                    madeBy: 6,
                    categoryId: 3,
                    price: 2780000,
                    brand: 4,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar:"https://robohash.org/autemestquis.png?size=50x50&set=set1"
                },
                {
                    productName: "Xe trẻ em 1",
                    material: 2,
                    madeBy: 6,
                    categoryId: 4,
                    price: 2330000,
                    brand: 4,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar:"https://robohash.org/autemestquis.png?size=50x50&set=set1"
                },
                {
                    productName: "Xe trẻ em 2",
                    material: 1,
                    madeBy: 3,
                    categoryId: 4,
                    price: 4380000,
                    brand: 4,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar:"https://robohash.org/autemestquis.png?size=50x50&set=set1"
                },
                {
                    productName: "Xe trẻ em 3",
                    material: 1,
                    madeBy: 2,
                    categoryId: 4,
                    price: 5380000,
                    brand: 2,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar:"https://robohash.org/autemestquis.png?size=50x50&set=set1"
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