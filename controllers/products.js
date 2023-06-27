import product from "../models/product.js";

export const getAllProducts= async(req,res)=>{
    const {company, name, featured, sort, select} = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }

    let apiData = product.find(queryObject);

    if(name) {
        queryObject.name = {$regex : name, $options : "i"}
    }
    
    if(featured) {
        queryObject.featured = featured;
    }

    if(sort){
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }

    if(select){
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    //for pagination

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page-1) * limit;
    apiData = apiData.skip(skip).limit(limit);

    const response = await apiData;
   res.status(200).json({response});
};

export const getAllProductsTesting = async(req,res)=>{
    const myData = await product.find({})
    res.status(200).json(req.query).sort("name -price");
}