import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import { productBrand, productMadeBy, productMaterial } from '@prisma/client';

@Injectable()
export class AdminsProductsService {
    constructor(private readonly prisma: PrismaService) { }

    async search(searchOption: {
        productName: string,
        material: productMaterial | null,
        status: boolean | null,
        madeBy: productMadeBy | null,
        category: number | null,
        brand: productBrand | null,
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
                    FK_products_categories: true
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
}
