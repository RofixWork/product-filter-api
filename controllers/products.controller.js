import { Query } from "mongoose";
import Product from "../models/Product.js";
import status from "http-status-codes";

/**
 * @class 
 * Define inside this class all Product Controllers
 */
class ProductController {
  /**
   * Get All Products &
   * Filter Products
   * @async
   * @static
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @returns {import("express").Response}
   */
  static async all(request, response) {
    const {search, category, featured, sort, select, numericFilters} = request.query;
    const queryObject = {};
    const {} = request.query;

    // pagination
    const limit = Number(request.query.limit) || 10,
    page = Number(request.query.page) || 1,
    skip = (page - 1) * limit;
    // pagination

    // filter by category
    if(category?.trim()) {
        queryObject.category = category.toLowerCase();
    }

    //filter by title or desc
    if(search?.trim()){
        queryObject['$or'] = [
            {title: {$regex: search, $options: 'i'}},
            {description: {$regex: search, $options: 'i'}}
        ]
    }

    //filter by featured
    if(featured?.trim()) {
        queryObject.featured = featured === 'true';
    }

    //filter by numeric filters
    if(numericFilters?.trim()) {
        const operators = {
            ">": "$gt",
            "<": "$lt",
            ">=": "$gte",
            "<=": "$lte",
            "=": "$eq",
        }
        const regex = /\b(>|<|>=|<=|=)\b/g;
        let filters = numericFilters.replace(regex, match => `-${operators[match]}-`)
        
        const options = ['price', 'rating'];
        
        filters = filters.replaceAll(' ', '').split(',').forEach(filter => {
            const [field, operator, value] = filter.split('-');
            
            if(options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)}
            }
        })
        
    }
    

    /**
     * @type {Query}
     */
    let result = Product.find(queryObject);

    //sort
    if(sort?.trim()) {
        const sortedList = sort.replaceAll(' ', '').split(',').join(' ');
        result = result.sort(sortedList);
    } else {
        result = result.sort('-createdAt'); // default sort by createdAt in descending order
    }

    //select
    if(select?.trim()) {
        const selectedList = select.replaceAll(' ', '').split(',').join(' ');
        result = result.select(selectedList);
    }

    
    const products = await result.skip(skip).limit(limit);
    // get total count for calc total pages
    const totalCount = await Product.countDocuments(queryObject);
    const totalPages = Math.ceil(totalCount / limit);

    return response.status(status.OK).json({ pagination: {nbHits: products.length, page, totalPages}, products });
  }
}

export default ProductController;
