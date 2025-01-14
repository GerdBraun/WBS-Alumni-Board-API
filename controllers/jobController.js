import { Comment, Company, Job, User, Skill, BridgeJobSkill } from "../db.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";

export const findAll = asyncWrapper(async (req, res, next) => {
  const { page, limit, offset } = res.pagination;
  const records = await Job.findAndCountAll({
    offset,
    limit,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Company,
        required: false,
        attributes: ["id", "name", "logo"],
      },
      {
        model: User,
        required: false,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Skill,
        required: false,
        attributes: ["id", "name"],
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
  const record = await Job.findByPk(id, {
    include: [
      {
        model: Company,
        required: false,
        attributes: ["id", "name", "logo"],
      },
      {
        model: User,
        required: false,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Skill,
        required: false,
        attributes: ["id", "name"],
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
  const record = await Job.create(body);

  // insert BridgeJobSkills
  const skills = body.skills;
  if (skills) {
    for (let i = 0; i < skills.length; i++) {
      await BridgeJobSkill.create({
        JobId: record.id,
        SkillId: skills[i],
      });
    }
  }

  res.status(201).json(record);
});

export const updateOne = asyncWrapper(async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;


  const skills = body.skills;
  if (skills) {
    await deleteBridgeJobSkillsByJobId(id);
    for (let i = 0; i < skills.length; i++) {
      const res = await BridgeJobSkill.create({
        JobId: id,
        SkillId: skills[i],
      });
    }
  }


  const [updated] = await Job.update(body, {
    where: { id },
  });

  if (!updated) {
    throw new ErrorResponse("Record not found", 404);
  }
  const updatedRecord = await Job.findByPk(id);
  res.json(updatedRecord);
});

export const deleteOne = asyncWrapper(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const deleted = await Job.destroy({
    where: { id },
  });

  if (!deleted) {
    throw new ErrorResponse("Record not found", 404);
  }
  await deleteBridgeJobSkillsByJobId(id);
  res.status(204).end();
});


/**
 * utility methods
 */

const deleteBridgeJobSkillsByJobId = async (id) => {
  await BridgeJobSkill.destroy({ where: { JobId: id } });
  return true;
};
