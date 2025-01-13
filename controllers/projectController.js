import { BridgeProjectSkill, Project, Skill, User } from "../db.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";

export const findAll = asyncWrapper(async (req, res, next) => {
  const { page, limit, offset } = res.pagination;
  const records = await Project.findAndCountAll({
    offset,
    limit,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Skill,
        required: false,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
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

export const findOneById = asyncWrapper(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const record = await Project.findByPk(id, {
    include: [
      {
        model: Skill,
        required: false,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
      {
        model: User,
        required: false,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  res.json(record);
});

export const createOne = asyncWrapper(async (req, res, next) => {
  const { body } = req;
  const record = await Project.create(body);

  // insert BridgeProjectSkills
  const skills = body.skills;
  if (skills) {
    for (let i = 0; i < skills.length; i++) {
      await BridgeUserSkill.create({
        UserId: id,
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

  const [updated] = await Project.update(body, {
    where: { id },
  });

  // delete / insert BridgeProjectSkills
  const skills = body.skills;
  if (skills) {
    await deleteBridgeProjectSkillsByProjectId(id);
    for (let i = 0; i < skills.length; i++) {
      await BridgeProjectSkill.create({
        ProjectId: id,
        SkillId: skills[i],
      });
    }
  }

  if (!updated) {
    throw new ErrorResponse("Record not found", 404);
  }
  const updatedRecord = await Project.findByPk(id);
  res.json(updatedRecord);
});

export const deleteOne = asyncWrapper(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const deleted = await Project.destroy({
    where: { id },
  });

  if (!deleted) {
    throw new ErrorResponse("Record not found", 404);
  }
  await deleteBridgeUserSkillsByProjectId(id);
  res.status(204).end();
});

/**
 * utility methods
 */

const deleteBridgeProjectSkillsByProjectId = async (id) => {
  await BridgeProjectSkill.destroy({ where: { ProjectId: id } });
  return true;
};
