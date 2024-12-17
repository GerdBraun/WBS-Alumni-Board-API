import {
  BridgeJobSkill,
  BridgeProjectSkill,
  BridgeUserSkill,
  Job,
  Project,
  Skill,
  User,
} from "../db.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";

export const getUsersMatchingToJobId = asyncWrapper(async (req, res, next) => {
  const { page, limit, offset } = res.pagination;
  const {
    params: { jobId },
  } = req;

  // get the Job's SkillIds from the bridge table
  const jobSkills = await BridgeJobSkill.findAll({
    where: { JobId: jobId },
    attributes: ["SkillId"],
  });
  const jobSkillsArr = jobSkills.map((record) => record.SkillId);

  // get user ids with matching skills
  const userSkills = await BridgeUserSkill.findAll({
    where: { SkillId: jobSkillsArr },
    attributes: ["UserId"],
  });
  const userSkillsArr = userSkills.map((record) => record.UserId);

  // get the matching users
  const records = await User.findAll({
    where: { id: userSkillsArr },
    attributes: ["id", "firstName", "lastName"],
    include: [
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

  res.json({
    ...paginationData,
    results: records,
  });
});

export const getJobsMatchingToUserId = asyncWrapper(async (req, res, next) => {
  const { page, limit, offset } = res.pagination;
  const {
    params: { userId },
  } = req;

  // get the User's SkillIds from the bridge table
  const userSkills = await BridgeUserSkill.findAll({
    where: { UserId: userId },
    attributes: ["SkillId"],
  });
  const userSkillsArr = userSkills.map((record) => record.SkillId);

  // get job ids with matching skills
  const jobSkills = await BridgeJobSkill.findAll({
    where: { SkillId: userSkillsArr },
    attributes: ["JobId"],
  });
  const jobSkillsArr = jobSkills.map((record) => record.JobId);

  // get the matching users
  const records = await Job.findAll({
    where: { id: jobSkillsArr },
    attributes: ["id", "title"],
    include: [
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

  res.json({
    ...paginationData,
    results: records,
  });
});

export const getUsersMatchingToProject = asyncWrapper(
  async (req, res, next) => {
    const { page, limit, offset } = res.pagination;
    const {
      params: { projectId },
    } = req;

    // get the Job's SkillIds from the bridge table
    const projectSkills = await BridgeProjectSkill.findAll({
      where: { ProjectId: projectId },
      attributes: ["SkillId"],
    });
    const projectSkillsArr = projectSkills.map((record) => record.SkillId);

    // get user ids with matching skills
    const userSkills = await BridgeUserSkill.findAll({
      where: { SkillId: projectSkillsArr },
      attributes: ["UserId"],
    });
    const userSkillsArr = userSkills.map((record) => record.UserId);

    // get the matching users
    const records = await User.findAll({
      where: { id: userSkillsArr },
      attributes: ["id", "firstName", "lastName"],
      include: [
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

    res.json({
      ...paginationData,
      results: records,
    });
  }
);

export const getProjectsMatchingToUser = asyncWrapper(
  async (req, res, next) => {
    const { page, limit, offset } = res.pagination;
    const {
      params: { userId },
    } = req;

    // get the User's SkillIds from the bridge table
    const userSkills = await BridgeUserSkill.findAll({
      where: { UserId: userId },
      attributes: ["SkillId"],
    });
    const userSkillsArr = userSkills.map((record) => record.SkillId);

    // get job ids with matching skills
    const projectSkills = await BridgeJobSkill.findAll({
      where: { SkillId: userSkillsArr },
      attributes: ["JobId"],
    });
    const projectSkillsArr = projectSkills.map((record) => record.JobId);

    // get the matching users
    const records = await Project.findAll({
      where: { id: projectSkillsArr },
      attributes: ["id", "title"],
      include: [
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

    res.json({
      ...paginationData,
      results: records,
    });
  }
);
