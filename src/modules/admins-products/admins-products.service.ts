import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import createProductDto from './dto/create-product.dto';
import searchQueryDto from './dto/search-query.dto';

@Injectable()
export class AdminsProductsService {
    constructor(private readonly prisma: PrismaService) { }

    async productFilter(query:searchQueryDto) {
        try {
            const count = await this.prisma.products.count({
                where: {
                    AND:[
                        {productName: {
                            contains:query.name
                        }},
                        {
                            material:query.material == "null" ? {} : Number(query.material)
                        },
                        {
                            status:query.status == "null" ? {} : Boolean(query.status)
                        },
                        {
                            madeBy:query.madeby == "null" ? {} : Number(query.madeby)
                        },
                        {
                            categoryId:query.category == "null" ? {} : Number(query.category)
                        },
                        {
                            brand:query.brand == "null" ? {} : Number(query.brand)
                        },
                        {
                            deleted:false
                        }
                    ]
                }
            })

            const result = await this.prisma.products.findMany({
                where: {
                    AND:[
                        {productName: {
                            contains:query.name
                        }},
                        {
                            material:query.material == "null" ? {} : Number(query.material)
                        },
                        {
                            status:query.status == "null" ? {} : Boolean(query.status)
                        },
                        {
                            madeBy:query.madeby == "null" ? {} : Number(query.madeby)
                        },
                        {
                            categoryId:query.category == "null" ? {} : Number(query.category)
                        },
                        {
                            brand:query.brand == "null" ? {} : Number(query.brand)
                        },
                        {
                            deleted:false
                        }
                    ],
                  },
                include: {
                    FK_products_categories: true,
                    FK_products_brands: true,
                    FK_products_material:true,
                    FK_products_madeBy:true
                },
                skip: (Number(query.current) - 1) * (Number(query.take)),
                take:  Number(query.take)
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

    async getBrand(){
        try {
            const result = await this.prisma.brands.findMany({
                where:{
                    deleted:false
                }
            })
            if (result) {
                return {
                    message:'Lấy nhãn hiệu thành công',
                    data:result
                }
            }
        } catch (error) {
            console.log('brand',error);
            
            return {error}
        }
    }
    
    async getMadeBy(){
        try {
            const result = await this.prisma.madeBy.findMany({
                where:{
                    deleted:false
                }
            })
            if (result) {
                return {
                    message:'Lấy nhãn hiệu thành công',
                    data:result
                }
            }
        } catch (error) {
            console.log('madeby',error);
            return {error}
        }
    }

    async getCategories(){
        try {
            const result = await this.prisma.categories.findMany({
                where:{
                    deleted:false
                }
            })
            if (result) {
                return {
                    message:'Lấy nhãn hiệu thành công',
                    data:result
                }
            }
        } catch (error) {
            console.log('category',error);
            return {error}
        }
    }

    async getMaterial(){
        try {
            const result = await this.prisma.material.findMany({
                where:{
                    deleted:false
                }
            })
            if (result) {
                return {
                    message:'Lấy nhãn hiệu thành công',
                    data:result
                }
            }
        } catch (error) {
            console.log('material',error);
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
                    price:Number(newProductDetail.price),
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
            console.log("tạo sản phẩm" , error);
            return { error }
        }
    }

    async uploadImgs(uploadDataList:any,productId:number) {
        try {

            await this.prisma.productsPics.deleteMany({
                where:{
                    productId
                }
            })

            await this.prisma.productsPics.createMany({
                data:uploadDataList
            })
           
            return {
                message:"Đăng tải hình ảnh thành công"
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

    async changeMaterialStatus(item:{id:number,status:boolean}){
        try {
            await this.prisma.material.update({
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

    async createNewMaterial(newMaterialName:string){
        try {
            await this.prisma.material.create({
                data:{
                    material:newMaterialName,
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                }
            })
            return {
                message:"Khởi tạo chất liệu thành công"
            }
        } catch (error) {
            return {error}
        }
    }
    
    async deleteMaterial(id:number){
        try {
            const checkProductExist = await this.prisma.products.findMany({
                where:{
                    material:id,
                    deleted:false
                }
            })
            
            if (checkProductExist.length != 0) {
                return {
                    success:false,
                    message:`Xoá thất bại chất liệu này vẫn còn ${checkProductExist.length} sản phẩm hiện hành , bạn nên xoá sản phẩm trước khi xoá chất liệu`
                }
            }else{
                await this.prisma.material.update({
                    where:{
                        id
                    },
                    data:{
                        deleted:true
                    }
                })
                return {
                    success:true,
                    message:"Xoá dữ liệu thành công"
                }
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async changeBrandStatus(item:{id:number,status:boolean}){
        try {
            await this.prisma.brands.update({
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

    async createNewBrand(picsList:Array<string>,brandName:string){
        try {
            await this.prisma.brands.create({
                data:{
                    brandLogo:picsList[0],
                    brandChoicePic:picsList[1],
                    brandName,
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                }
            })
            return {
                message:"Khởi tạo nhãn hiệu thành công"
            }
        } catch (error) {
            return {error}
        }
    }

    async deleteBrand(id:number){
        try {
            const checkProductExist = await this.prisma.products.findMany({
                where:{
                    brand:id,
                    deleted:false
                }
            })
            
            if (checkProductExist.length != 0) {
                return {
                    success:false,
                    message:`Xoá thất bại hiện nhãn hiệu này vẫn còn ${checkProductExist.length} sản phẩm hiện hành , bạn nên xoá sản phẩm trước khi xoá nhãn hiệu`
                }
            }else{
                await this.prisma.brands.update({
                    where:{
                        id
                    },
                    data:{
                        deleted:true
                    }
                })
                return {
                    success:true,
                    message:"Xoá dữ liệu thành công"
                }
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async changeCategoryStatus(item:{id:number,status:boolean}){
        try {
            await this.prisma.categories.update({
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

    async createNewCategory(newCategoryName:string){
        try {
            await this.prisma.categories.create({
                data:{
                    categoryName:newCategoryName,
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                }
            })
            return {
                message:"Khởi tạo thể loại thành công"
            }
        } catch (error) {
            return {error}
        }
    }

    async deleteCategory(id:number){
        try {
            const checkProductExist = await this.prisma.products.findMany({
                where:{
                    categoryId:id,
                    deleted:false
                }
            })
            
            if (checkProductExist.length != 0) {
                return {
                    success:false,
                    message:`Xoá thất bại thể loại này vẫn còn ${checkProductExist.length} sản phẩm hiện hành , bạn nên xoá sản phẩm trước khi xoá thể loại`
                }
            }else{
                await this.prisma.categories.update({
                    where:{
                        id
                    },
                    data:{
                        deleted:true
                    }
                })
                return {
                    success:true,
                    message:"Xoá dữ liệu thành công"
                }
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async changeMadeByStatus(item:{id:number,status:boolean}){
        try {
            await this.prisma.madeBy.update({
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

    async createNewMadeBy(newCountry:string){
        try {
            await this.prisma.madeBy.create({
                data:{
                    country:newCountry,
                    createAt:String(Date.now()),
                    updateAt:String(Date.now())
                }
            })
            return {
                message:"Khởi tạo thể loại thành công"
            }
        } catch (error) {
            return {error}
        }
    }

    async deleteMadeBy(id:number){
        try {
            const checkProductExist = await this.prisma.products.findMany({
                where:{
                    madeBy:id,
                    deleted:false
                }
            })
            
            if (checkProductExist.length != 0) {
                return {
                    success:false,
                    message:`Xoá thất bại xuất xứ này vẫn còn ${checkProductExist.length} sản phẩm hiện hành , bạn nên xoá sản phẩm trước khi xoá xuất xứ`
                }
            }else{
                await this.prisma.madeBy.update({
                    where:{
                        id
                    },
                    data:{
                        deleted:true
                    }
                })
                return {
                    success:true,
                    message:"Xoá dữ liệu thành công"
                }
            }
        } catch (error) {
            return {
                error
            }
        }
    }
}
