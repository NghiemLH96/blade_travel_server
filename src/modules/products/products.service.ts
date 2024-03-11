import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import searchQueryDto from './dto/search-query.dto';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) { }
    async getBestSeller() {
        try {
            const result = await this.prisma.products.findMany({
                where: {
                    bestSeller: true,
                    deleted: false,
                    status:true
                },
                include: {
                    FK_products_brands: true,
                    FK_products_madeBy: true,
                    FK_products_categories: true,
                    FK_products_material: true,
                }
            })
            return {
                message: "Lấy dữ liệu thành công",
                data: result
            }
        } catch (error) {
            console.log("lấy dữ liệu bestseller thất bại", error);
            return {
                error
            }
        }
    }

    async searchByOption(query: searchQueryDto) {
        try {
            const count = await this.prisma.products.count({
                where: {
                    AND: [
                        {
                            namefield: {
                                contains: query.name.toLowerCase()
                            }
                        },
                        {
                            status: true
                        },
                        {
                            material: query.material == "null" ? {} : Number(query.material)
                        },
                        {
                            madeBy: query.madeby == "null" ? {} : Number(query.madeby)
                        },
                        {
                            categoryId: query.category == "null" ? {} : Number(query.category)
                        },
                        {
                            brand: query.brand == "null" ? {} : Number(query.brand)
                        },
                        {
                            deleted: false
                        }
                    ]
                }
            })

            const result = await this.prisma.products.findMany({
                where: {
                    AND: [
                        {
                            namefield: {
                                contains: query.name.toLowerCase()
                            }
                        },
                        {
                            material: query.material == "null" ? {} : Number(query.material)
                        },
                        {
                            status: true
                        },
                        {
                            madeBy: query.madeby == "null" ? {} : Number(query.madeby)
                        },
                        {
                            categoryId: query.category == "null" ? {} : Number(query.category)
                        },
                        {
                            brand: query.brand == "null" ? {} : Number(query.brand)
                        },
                        {
                            deleted: false
                        }
                    ],
                },
                include: {
                    FK_products_categories: true,
                    FK_products_brands: true,
                    FK_products_material: true,
                    FK_products_madeBy: true,
                    productPics:true
                },
                skip: (Number(query.current) - 1) * (Number(query.take)),
                take: Number(query.take)
            })
            const data = [...result]
            
            return {
                message:"lấy dữ liệu thành công",
                data,
                count
            }
        } catch (error) {
            console.log("error",error);
            
            return {
                message: "Lấy dữ liệu thất bại",
                error
            }
        }
    }

    async getProductByBrand(brandId:number){
        try {
            const result = await this.prisma.products.findMany({
                where:{
                    brand:brandId,
                    status:true,
                    deleted:false
                },
                include:{
                    FK_products_brands:true,
                    FK_products_madeBy:true,
                    FK_products_categories:true,
                    FK_products_material:true
                }
            })
            return {
                message:"Lấy dữ liệu thành công",
                data:result
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async getBrandDetail(brandId:number){
        try {
            const result = await this.prisma.brands.findMany({
                where:{
                    id:brandId,
                    status:true,
                    deleted:false
                }
            })
            return {
                message:"Lấy dữ liệu thành công",
                data:result
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async addToCart(userId:number,itemId:number){
        try {
            const checkExist = await this.prisma.cartItem.findFirst({
                where:{
                    userId,
                    productId:itemId,
                    status:"shopping"
                }
            })
            if (checkExist) {
                await this.prisma.cartItem.update({
                    where:{
                        id:checkExist.id
                    },
                    data:{
                        quantity:{increment:1}
                    }
                })
                return {message:"Tăng số lượng sản phẩm thành công"}
            }else{
                await this.prisma.cartItem.create({
                    data:{
                        userId,
                        productId:itemId,
                        quantity:1,
                        createAt:String(Date.now()),
                        updateAt:String(Date.now())
                    }
                })
                return {message:"Tạo sản phẩm thành công"}
            }
        } catch (error) {
            console.log(error);
            
            return {error}
        }
    }

    async getCart(userId:number){
        try {
            const data = await this.prisma.cartItem.findMany({
                where:{
                    userId,
                    status:'shopping'
                },
                include:{
                    FK_products_cartItem:true
                }
            })
            return {
                message:"lấy dữ liệu thành công",
                data
            }
        } catch (error) {
            return {error}
        }
    }

    async cartIncrease(itemId:number){
        try {
            await this.prisma.cartItem.update({
                where:{
                    id:itemId
                },
                data:{
                    quantity:{increment:1}
                }
            })
            return {
                message:'Tăng số lượng sản phẩm thành công'
            }
        } catch (error) {
            return {error}
        }
    }

    async cartDecrease(itemId:number){
        try {
            await this.prisma.cartItem.update({
                where:{
                    id:itemId
                },
                data:{
                    quantity:{decrement:1}
                }
            })
            return {
                message:'Giảm số lượng sản phẩm thành công'
            }
        } catch (error) {
            return {error}
        }
    }

    async removeCartItem(itemId:number){
        try {
            await this.prisma.cartItem.delete({
                where:{
                    id:itemId
                }
            })
            return {
                message:'Xoá sản phẩm thành công'
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async checkOutCOD(receiptInfo:{id:number,phone:string,address:string,email:string}){
        try {
            const result = await this.prisma.receipts.create({
                data:{
                    userEmail:receiptInfo.email,
                    address:receiptInfo.address,
                    userId:receiptInfo.id,
                    phone:receiptInfo.phone,
                    paymentMethod:'cod',
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                }
            })
            await this.prisma.cartItem.updateMany({
                where:{
                    userId:receiptInfo.id,
                    status:'shopping'
                },
                data:{
                    receiptId:result.id,
                    status:'pending'
                }
            })
            return {
                message:"Thanh toán COD thành công"
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async checkOutWallet(receiptInfo:{id:number,phone:string,address:string,email:string}){
        try {
            const user = await this.prisma.users.findFirst({
                where:{
                    id:receiptInfo.id
                }
            })
            const cartItems = await this.prisma.cartItem.findMany({
                where:{
                    userId:receiptInfo.id,
                    status:'shopping'
                },
                include:{
                    FK_products_cartItem:true
                }
            })
            const totalPrice = cartItems.reduce((total,value)=>{return (total+(value.quantity*value.FK_products_cartItem.price))},0)
            if (user.wallet>=totalPrice) {
                const result = await this.prisma.receipts.create({
                    data:{
                        userEmail:receiptInfo.email,
                        address:receiptInfo.address,
                        phone:receiptInfo.phone,
                        userId:receiptInfo.id,
                        paymentMethod:'wallet',
                        status:'success',
                        createAt:String(Date.now()),
                        updateAt:String(Date.now())
                    }
                })
                const userInfo = await this.prisma.users.update({
                    where:{
                        id:receiptInfo.id,
                    },
                    data:{
                        wallet:{decrement:totalPrice}
                    }
                })
                await this.prisma.cartItem.updateMany({
                    where:{
                        userId:receiptInfo.id,
                        status:'shopping'
                    },
                    data:{
                        receiptId:result.id,
                        status:'paid'
                    }
                })
                            
            return {
                paid:true,
                user:userInfo,
                message:"Thanh toán ví thành công"
            }
            }else{
                return{
                    paid:false,
                    message:"Số dư không đủ"
                }
            }

        } catch (error) {
            return {
                error
            }
        }
    }
}
