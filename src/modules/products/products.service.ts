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
            console.log("query",query);
            
            const count = await this.prisma.products.count({
                where: {
                    AND: [
                        {
                            productName: {
                                contains: query.name
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
                            productName: {
                                contains: query.name
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
                    FK_products_madeBy: true
                },
                skip: (Number(query.current) - 1) * (Number(query.take)),
                take: Number(query.take)
            })
            const data = [...result]
            console.log("data",data);
            
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
}
