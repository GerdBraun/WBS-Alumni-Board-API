import { Skill, User } from "../db.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";

export const findAll = asyncWrapper(async (req, res, next) => {
  const { page, limit, offset } = res.pagination;
  const records = await Skill.findAndCountAll({
    offset,
    limit,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        required: false,
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        },
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

export const findOneById = asyncWrapper(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const record = await Skill.findByPk(id, {
    include: [
      {
        model: User,
        required: false,
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  res.json(record);
});

export const createOne = asyncWrapper(async (req, res, next) => {
  const { body } = req;
  const record = await Skill.create(body);
  res.status(201).json(record);
});

export const updateOne = asyncWrapper(async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;

  const [updated] = await Skill.update(body, {
    where: { id },
  });

  if (!updated) {
    throw new ErrorResponse("Record not found", 404);
  }
  const updatedRecord = await Skill.findByPk(id);
  res.json(updatedRecord);
});

export const deleteOne = asyncWrapper(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const deleted = await Skill.destroy({
    where: { id },
  });

  if (!deleted) {
    throw new ErrorResponse("Record not found", 404);
  }
  res.status(204).end();
});
