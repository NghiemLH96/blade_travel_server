import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import createProductDto from './dto/create-product.dto';
import searchQueryDto from './dto/search-query.dto';
import updateProductDto from './dto/update-product.dto';
import { receiptStatus } from '@prisma/client';

@Injectable()
export class AdminsProductsService {
    constructor(private readonly prisma: PrismaService) { }

    async productFilter(query: searchQueryDto) {
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
                            material: query.material == "null" ? {} : Number(query.material)
                        },
                        {
                            status: query.status == "null" ? {} : Boolean(query.status)
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
                            status: query.status == "null" ? {} : Boolean(query.status)
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
            return {
                message: "lấy dữ liệu thành công",
                data,
                count
            }

        } catch (error) {
            console.log("error", error);

            return {
                message: "Lấy dữ liệu thất bại",
                error
            }
        }
    }

    async getBrand() {
        try {
            const result = await this.prisma.brands.findMany({
                where: {
                    deleted: false
                }
            })
            if (result) {
                return {
                    message: 'Lấy nhãn hiệu thành công',
                    data: result
                }
            }
        } catch (error) {
            console.log('brand', error);

            return { error }
        }
    }

    async getMadeBy() {
        try {
            const result = await this.prisma.madeBy.findMany({
                where: {
                    deleted: false
                }
            })
            if (result) {
                return {
                    message: 'Lấy nhãn hiệu thành công',
                    data: result
                }
            }
        } catch (error) {
            console.log('madeby', error);
            return { error }
        }
    }

    async getCategories() {
        try {
            const result = await this.prisma.categories.findMany({
                where: {
                    deleted: false
                }
            })
            if (result) {
                return {
                    message: 'Lấy nhãn hiệu thành công',
                    data: result
                }
            }
        } catch (error) {
            console.log('category', error);
            return { error }
        }
    }

    async getMaterial() {
        try {
            const result = await this.prisma.material.findMany({
                where: {
                    deleted: false
                }
            })
            if (result) {
                return {
                    message: 'Lấy nhãn hiệu thành công',
                    data: result
                }
            }
        } catch (error) {
            console.log('material', error);
            return { error }
        }
    }

    async changeStatus(item: { id: number, status: boolean }) {
        try {
            await this.prisma.products.update({
                where: {
                    id: item.id
                },
                data: {
                    status: !item.status,
                    updateAt: String(Date.now())
                }
            })
            return {
                message: "Thay đổi trạng thái thành công"
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async setBestSeller(item: { id: number, bestSeller: boolean }) {
        try {
            if (!item.bestSeller) {
                const result = await this.prisma.products.findMany({
                    where: {
                        bestSeller: true
                    }
                })
                if (result.length >= 4) {
                    return {
                        flag: false,
                        message: "Mỗi lần chỉ được hiển thị nhiều nhất 4 sản phẩm bestSeller"
                    }
                } else {
                    await this.prisma.products.update({
                        where: {
                            id: item.id
                        },
                        data: {
                            bestSeller: !item.bestSeller,
                            updateAt:String(Date.now())
                        }
                    })
                    return {
                        flag: true,
                        message: "Bật BS thành công"
                    }
                }
            } else {
                await this.prisma.products.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        bestSeller: !item.bestSeller,
                        updateAt:String(Date.now())
                    }
                })
                return {
                    flag: true,
                    message: "Tắt BS thành công"
                }
            }

        } catch (error) {
            return { error }
        }
    }

    async createNewProduct(newProductDetail: createProductDto) {
        try {
            let createResult = await this.prisma.products.create({
                data: {
                    productName: newProductDetail.productName,
                    namefield:newProductDetail.productName.toLowerCase(),
                    material: newProductDetail.material,
                    madeBy: newProductDetail.madeBy,
                    categoryId: newProductDetail.categoryId,
                    price: Number(newProductDetail.price),
                    brand: newProductDetail.brand,
                    avatar: newProductDetail.avatar,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                }
            })
            return {
                message: "Thêm sản phẩm thành công",
                data: createResult
            }
        } catch (error) {
            console.log("tạo sản phẩm", error);
            return { error }
        }
    }

    async updateDetail(productDetail: updateProductDto) {
        try {
            await this.prisma.products.update({
                where: {
                    id: productDetail.id
                },
                data: {
                    productName: productDetail.productName,
                    material: productDetail.material,
                    madeBy: productDetail.madeBy,
                    categoryId: productDetail.categoryId,
                    price: Number(productDetail.price),
                    brand: productDetail.brand,
                    updateAt:String(Date.now())
                }
            })
            return {
                message: "Chỉnh sửa thông tin sản phẩm thành công"
            }
        } catch (error) {
            return { error }
        }
    }

    async uploadImgs(uploadDataList: any, productId: number) {
        try {

            await this.prisma.productsPics.deleteMany({
                where: {
                    productId
                }
            })

            await this.prisma.productsPics.createMany({
                data: uploadDataList
            })

            return {
                message: "Đăng tải hình ảnh thành công"
            }

        } catch (error) {
            return { error }
        }
    }

    async deleteProduct(id: number) {
        try {
            const result = await this.prisma.products.update({
                where: {
                    id
                },
                data: {
                    deleted: true,
                    updateAt:String(Date.now())
                }
            })
            return {
                message: "Xoá sản phẩm thành công"
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async changeMaterialStatus(item: { id: number, status: boolean }) {
        try {
            await this.prisma.material.update({
                where: {
                    id: item.id
                },
                data: {
                    status: !item.status,
                    updateAt: String(Date.now())
                }
            })
            return {
                message: "Thay đổi trạng thái thành công"
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async createNewMaterial(newMaterialName: string) {
        try {
            await this.prisma.material.create({
                data: {
                    material: newMaterialName,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                }
            })
            return {
                message: "Khởi tạo chất liệu thành công"
            }
        } catch (error) {
            return { error }
        }
    }

    async deleteMaterial(id: number) {
        try {
            const checkProductExist = await this.prisma.products.findMany({
                where: {
                    material: id,
                    deleted: false
                }
            })

            if (checkProductExist.length != 0) {
                return {
                    success: false,
                    message: `Xoá thất bại chất liệu này vẫn còn ${checkProductExist.length} sản phẩm hiện hành , bạn nên xoá sản phẩm trước khi xoá chất liệu`
                }
            } else {
                await this.prisma.material.update({
                    where: {
                        id
                    },
                    data: {
                        deleted: true,
                        updateAt:String(Date.now())
                    }
                })
                return {
                    success: true,
                    message: "Xoá dữ liệu thành công"
                }
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async changeBrandStatus(item: { id: number, status: boolean }) {
        try {
            await this.prisma.brands.update({
                where: {
                    id: item.id
                },
                data: {
                    status: !item.status,
                    updateAt: String(Date.now())
                }
            })
            return {
                message: "Thay đổi trạng thái thành công"
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async createNewBrand(picsList: Array<string>, brandName: string) {
        try {
            await this.prisma.brands.create({
                data: {
                    brandLogo: picsList[0],
                    brandChoicePic: picsList[1],
                    brandName,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                }
            })
            return {
                message: "Khởi tạo nhãn hiệu thành công"
            }
        } catch (error) {
            return { error }
        }
    }

    async deleteBrand(id: number) {
        try {
            const checkProductExist = await this.prisma.products.findMany({
                where: {
                    brand: id,
                    deleted: false
                }
            })

            if (checkProductExist.length != 0) {
                return {
                    success: false,
                    message: `Xoá thất bại hiện nhãn hiệu này vẫn còn ${checkProductExist.length} sản phẩm hiện hành , bạn nên xoá sản phẩm trước khi xoá nhãn hiệu`
                }
            } else {
                await this.prisma.brands.update({
                    where: {
                        id
                    },
                    data: {
                        deleted: true,
                        updateAt:String(Date.now())
                    }
                })
                return {
                    success: true,
                    message: "Xoá dữ liệu thành công"
                }
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async changeCategoryStatus(item: { id: number, status: boolean }) {
        try {
            await this.prisma.categories.update({
                where: {
                    id: item.id
                },
                data: {
                    status: !item.status,
                    updateAt: String(Date.now())
                }
            })
            return {
                message: "Thay đổi trạng thái thành công"
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async createNewCategory(fireBaseFileName: string, newCategoryName: string) {
        try {
            await this.prisma.categories.create({
                data: {
                    categoryName: newCategoryName,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar: fireBaseFileName
                }
            })
            return {
                message: "Khởi tạo thể loại thành công"
            }
        } catch (error) {
            return { error }
        }
    }

    async deleteCategory(id: number) {
        try {
            const checkProductExist = await this.prisma.products.findMany({
                where: {
                    categoryId: id,
                    deleted: false
                }
            })

            if (checkProductExist.length != 0) {
                return {
                    success: false,
                    message: `Xoá thất bại thể loại này vẫn còn ${checkProductExist.length} sản phẩm hiện hành , bạn nên xoá sản phẩm trước khi xoá thể loại`
                }
            } else {
                await this.prisma.categories.update({
                    where: {
                        id
                    },
                    data: {
                        deleted: true,
                        updateAt:String(Date.now())
                    }
                })
                return {
                    success: true,
                    message: "Xoá dữ liệu thành công"
                }
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async changeMadeByStatus(item: { id: number, status: boolean }) {
        try {
            await this.prisma.madeBy.update({
                where: {
                    id: item.id
                },
                data: {
                    status: !item.status,
                    updateAt: String(Date.now())
                }
            })
            return {
                message: "Thay đổi trạng thái thành công"
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async createNewMadeBy(newCountry: string) {
        try {
            await this.prisma.madeBy.create({
                data: {
                    country: newCountry,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                }
            })
            return {
                message: "Khởi tạo thể loại thành công"
            }
        } catch (error) {
            return { error }
        }
    }

    async deleteMadeBy(id: number) {
        try {
            const checkProductExist = await this.prisma.products.findMany({
                where: {
                    madeBy: id,
                    deleted: false
                }
            })

            if (checkProductExist.length != 0) {
                return {
                    success: false,
                    message: `Xoá thất bại xuất xứ này vẫn còn ${checkProductExist.length} sản phẩm hiện hành , bạn nên xoá sản phẩm trước khi xoá xuất xứ`
                }
            } else {
                await this.prisma.madeBy.update({
                    where: {
                        id
                    },
                    data: {
                        deleted: true,
                        updateAt:String(Date.now())
                    }
                })
                return {
                    success: true,
                    message: "Xoá dữ liệu thành công"
                }
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async getReceipts(query:{userName:string,status:receiptStatus,current:number,size:number}) {
        try {
            const count = await this.prisma.receipts.count({
                where:{
                    AND:[
                        {userEmail:{
                            contains:query.userName
                        }},
                        {
                            status:query.status ? query.status : {}
                        }
                    ]
                }
            })

            const result = await this.prisma.receipts.findMany({
                where:{
                    AND:[
                        {userEmail:{
                            contains:query.userName
                        }},
                        {
                            status:query.status ? query.status : {}
                        }
                    ]
                },
                include: {
                    items: {
                      include: {
                        FK_receipt_cartItem: true,
                        FK_products_cartItem:true,
                        FK_user_cartItem:true
                      }
                    }
                  },
                  skip:(Number(query.current)-1)*Number(query.size),
                  take:Number(query.size)
            })
            
            return {
                message: "Lấy dữ liệu thành công",
                total:count,
                data: result
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async cancelReceipt(receiptId:number){
        try {
            const result = await this.prisma.receipts.update({
                where:{
                    id:receiptId,
                    status:'pending'
                },
                data:{
                    status:'canceled',
                    updateAt:String(Date.now())
                }
            })
            return {
                message:'Huỷ đơn thành công'
            }
        } catch (error) {
            return {
                error
            }
        }
    }
}
