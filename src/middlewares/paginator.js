import BadRequest from "../errors/badRequest.js";

async function paginate(req, res, next) {
    try {
        let { limit = 5, page = 1, sortBy = "_id:1" } = req.query;
        let [sortField, sortOrder] = sortBy.split(":");

        limit = parseInt(limit);
        page = parseInt(page);
        sortOrder = parseInt(sortOrder);

        const result = req.result;

        if (limit > 0 && page > 0) {
            const paginatedResult = await result.find({})
                .sort({ [sortField]: sortOrder })
                .skip((page - 1) * limit)
                .limit(limit)
            res.status(200).json(paginatedResult);
        } else {
            next(new BadRequest());
        }
    } catch (error) {
        next(error);
    }
}

export default paginate;