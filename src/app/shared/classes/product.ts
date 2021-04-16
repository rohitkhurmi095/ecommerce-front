export interface Product{
    //--------------
    //PRODUCT MODEL
    //--------------
    // API docs:/api/ProductMaster/GetProductList
    //id,name,
    //category,size,color,tags,pictures,variants
    //price,salePeice,,stock
    //isSale,isNew,
    //description.shortDescription

    id?: number;
    name?: string;
    price: number;
    salePrice?: number;
    discount?: number;
    shortDetails?: string;
    description?: string;
    stock?: number;
    isNew?: boolean;
    isSale?: boolean;
    category: string;
    pictures?: [];
    colors?: [];
    size?: [];
    tags?: [];
    variants?: []
}