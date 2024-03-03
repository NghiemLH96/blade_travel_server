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
                brandLogo:"https://firebasestorage.googleapis.com/v0/b/blade-firebase.appspot.com/o/assets%2Fbrands%2FJett.png?alt=media&token=1882c748-c356-40df-8ad4-c4153ebc0191",
                brandChoicePic:"https://firebasestorage.googleapis.com/v0/b/blade-firebase.appspot.com/o/assets%2Fbrands%2FJett.jpg?alt=media&token=1da75fff-7363-4e8a-b1ea-b870992e4211",
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                brandName: 'Giant',
                brandLogo:"https://firebasestorage.googleapis.com/v0/b/blade-firebase.appspot.com/o/assets%2Fbrands%2FGiant.png?alt=media&token=6275f191-d719-4fa4-ba76-c03d4481b601",
                brandChoicePic:"https://firebasestorage.googleapis.com/v0/b/blade-firebase.appspot.com/o/assets%2Fbrands%2FGiant.jpg?alt=media&token=3f11a6b5-0dc6-4e4d-baf1-fd6b79d4e3cd",
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                brandName: 'Life',
                brandLogo:  "https://firebasestorage.googleapis.com/v0/b/blade-firebase.appspot.com/o/assets%2Fbrands%2FLife.webp?alt=media&token=9227cf9f-096b-4209-a034-bdf435d58d51",
                brandChoicePic:"https://firebasestorage.googleapis.com/v0/b/blade-firebase.appspot.com/o/assets%2Fbrands%2FLife.avif?alt=media&token=1bddb70f-4653-423d-8685-42e3fc25c2de",
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                brandName: 'Fonix',
                brandLogo:"https://firebasestorage.googleapis.com/v0/b/blade-firebase.appspot.com/o/assets%2Fbrands%2FFonix.webp?alt=media&token=e7d61729-a2c2-411e-98af-0c09a186e471",
                brandChoicePic:"https://firebasestorage.googleapis.com/v0/b/blade-firebase.appspot.com/o/assets%2Fbrands%2Ffonix.jpg?alt=media&token=1db9462d-76fe-43fe-b829-9c516594596a",
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                brandName: 'Hitasa',
                brandLogo: "https://firebasestorage.googleapis.com/v0/b/blade-firebase.appspot.com/o/assets%2Fbrands%2Fhitasa.png?alt=media&token=48ef0474-5636-45b1-9569-89b18f74ae41",
                brandChoicePic:"https://firebasestorage.googleapis.com/v0/b/blade-firebase.appspot.com/o/assets%2Fbrands%2Fhitasa.jpg?alt=media&token=e1c06e77-7b91-4fc6-8953-cf66b949c511",
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                brandName: 'Hero',
                brandLogo:"https://firebasestorage.googleapis.com/v0/b/blade-firebase.appspot.com/o/assets%2Fbrands%2FHero.svg?alt=media&token=fec8476b-4549-40b9-bea8-58e06e642ca3",
                brandChoicePic:"https://firebasestorage.googleapis.com/v0/b/blade-firebase.appspot.com/o/assets%2Fbrands%2FHero.jpg?alt=media&token=b4752ecc-fa42-43ff-8071-e89d14771568",
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                brandName: 'Khác',
                brandLogo:"https://firebasestorage.googleapis.com/v0/b/blade-firebase.appspot.com/o/assets%2Fbrands%2Fothers-logo-860-5549.png?alt=media&token=c371cb06-e5ca-41d9-8362-2be75cfc48c5",
                brandChoicePic:"https://firebasestorage.googleapis.com/v0/b/blade-firebase.appspot.com/o/assets%2Fbrands%2Fother.jpg?alt=media&token=55d0bd1a-0d5f-47ba-871f-cd73d3c5c47f",
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