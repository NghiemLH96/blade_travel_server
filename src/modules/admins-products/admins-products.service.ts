import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import createProductDto from './dto/create-product.dto';

@Injectable()
export class AdminsProductsService {
    constructor(private readonly prisma: PrismaService) { }

    async search(searchOption: {
        productName: string,
        material: number | null,
        status: boolean | null,
        madeBy: number | null,
        category: number | null,
        brand: number | null,
        currentPage: number,
        pageSize: number
    }) {
        try {
            const count = await this.prisma.products.count({
                where: {
                    AND:[
                        {productName: {
                            contains:searchOption.productName
                        }},
                        {
                            material:searchOption.material == null ? {} : searchOption.material
                        },
                        {
                            status:searchOption.status == null ? {} : searchOption.status
                        },
                        {
                            madeBy:searchOption.madeBy == null ? {} : searchOption.madeBy
                        },
                        {
                            categoryId:searchOption.category == null ? {} : searchOption.category
                        },
                        {
                            brand:searchOption.brand == null ? {} : searchOption.brand
                        }
                    ]
                }
            })
            const result = await this.prisma.products.findMany({
                where: {
                    AND:[
                        {productName: {
                            contains:searchOption.productName
                        }},
                        {
                            material:searchOption.material == null ? {} : searchOption.material
                        },
                        {
                            status:searchOption.status == null ? {} : searchOption.status
                        },
                        {
                            madeBy:searchOption.madeBy == null ? {} : searchOption.madeBy
                        },
                        {
                            categoryId:searchOption.category == null ? {} : searchOption.category
                        },
                        {
                            brand:searchOption.brand == null ? {} : searchOption.brand
                        }
                    ]
                  },
                  
                include: {
                    FK_products_categories: true,
                    FK_products_brands: true,
                    FK_products_material:true,
                    FK_products_madeBy:true
                },
                skip: (searchOption.currentPage - 1) * searchOption.pageSize,
                take: searchOption.pageSize
            })

            return {
                message: "Lấy dữ liệu thành công",
                data: result,
                total: count
            }
        } catch (error) {
            return {
                message: "Lấy dữ liệu thất bại",
                error
            }
        }
    }

    async getBrand(){
        try {
            const result = await this.prisma.brands.findMany({})
            if (result) {
                return {
                    message:'Lấy nhãn hiệu thành công',
                    data:result
                }
            }
        } catch (error) {
            return {error}
        }
    }
    
    async getMadeBy(){
        try {
            const result = await this.prisma.madeBy.findMany({})
            if (result) {
                return {
                    message:'Lấy nhãn hiệu thành công',
                    data:result
                }
            }
        } catch (error) {
            return {error}
        }
    }

    async getCategories(){
        try {
            const result = await this.prisma.categories.findMany({})
            if (result) {
                return {
                    message:'Lấy nhãn hiệu thành công',
                    data:result
                }
            }
        } catch (error) {
            return {error}
        }
    }

    async getMaterial(){
        try {
            const result = await this.prisma.material.findMany({})
            if (result) {
                return {
                    message:'Lấy nhãn hiệu thành công',
                    data:result
                }
            }
        } catch (error) {
            return {error}
        }
    }

    async changeStatus(item:{id:number,status:boolean}){
        try {
            await this.prisma.products.update({
                where:{
                    id:item.id
                },
                data:{
                    status:!item.status,
                    updateAt:String(Date.now())
                }
            })
            return {
                message:"Thay đổi trạng thái thành công"
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async createNewProduct(newProductDetail: createProductDto) {
        try {
            let createResult = await this.prisma.products.create({
                data: {
                    productName:newProductDetail.productName,
                    material:newProductDetail.material,
                    madeBy:newProductDetail.madeBy,
                    categoryId:newProductDetail.categoryId,
                    price:newProductDetail.price,
                    brand:newProductDetail.brand,
                    avatar:newProductDetail.avatar,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                }
            })
            return {
                message: "Thêm sản phẩm thành công",
                data: createResult
            }
        } catch (error) {
            return { error }
        }
    }

    async deleteProduct(id:number){
        try {
            const result = await this.prisma.products.update({
                where:{
                    id
                },
                data:{
                    deleted:true
                }
            })
            return {
                message:"Xoá sản phẩm thành công"
            }
        } catch (error) {
            return {
                error
            }
        }
    }
}
