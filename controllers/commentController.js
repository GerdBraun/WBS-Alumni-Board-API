import { asyncWrapper } from "../utils/asyncWrapper.js";
import { Comment, User } from "../db.js";

export const findAllByModelAndId = asyncWrapper(async (req, res, next) => {
    const { page, limit, offset } = res.pagination;
    const {
      params: { model, id },
    } = req;
    const records = await Comment.findAndCountAll({
      where: {
        parent: model,
        parentId: id,
      },
      offset,
      limit,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          required: false,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
  
    const totalCount = records.count;
    const totalPages = Math.ceil(totalCount / limit);
  
    const paginationData = {
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  
    res.json({ ...paginationData, results: records.rows });
  });
  