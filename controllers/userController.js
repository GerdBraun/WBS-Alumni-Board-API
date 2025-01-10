import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Company, Job, User, BridgeUserSkill, Skill, Project } from "../db.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";

export const register = asyncWrapper(async (req, res, next) => {
  const {
    body: { firstName, lastName, email, password },
  } = req;

  const found = await User.findOne({ where: { email } });

  if (found) throw new ErrorResponse("User Already Exist", 409);

  const user = await User.create({ firstName, lastName, email, password });

  res.json(user);
});

export const login = asyncWrapper(async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  const user = await User.scope("withPassword").findOne({
    where: { email },
    include: [
      {
        model: Company,
        required: false,
        attributes: ["id", "name"],
      },
      {
        model: Skill,
        required: false,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Project,
        required: false,
        attributes: ["id", "title"],
      },
      {
        model: Job,
        required: false,
        attributes: ["id", "title"],
        include: [
          {
            model: Company,
            required: false,
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  });

  if (!user)
    throw new ErrorResponse("Forbidden. Invalid email or password", 403);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    throw new ErrorResponse("Forbidden. Invalid email or password", 403);

  const payload = { id: user.id, email: user.email, role: user.role };

  const token = jwt.sign(payload, process.env.JWT_SECRET ?? "secret", {
    expiresIn: 3600000,
  });

  // res.json({ user: payload, token });
  res.json({ user, token });
});

export const getProfile = asyncWrapper(async (req, res, next) => {
  const {
    user: { id },
  } = req;
  const user = await User.findByPk(id);
  res.json(user);
});

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return next(new ErrorResponse('No token provided', 403));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ErrorResponse('Failed to authenticate token', 401));
    }

    const userId = decoded.id;
  // res.json({ user: payload, token });
  res.json(userId);
  });
};

/**
 * "standard" CRUD
 */

export const findOneById = asyncWrapper(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const record = await User.findByPk(id, {
    include: [
      {
        model: Company,
        required: false,
        attributes: ["id", "name"],
      },
      {
        model: Skill,
        required: false,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Project,
        required: false,
        attributes: ["id", "title"],
      },
      {
        model: Job,
        required: false,
        attributes: ["id", "title"],
        include: [
          {
            model: Company,
            required: false,
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  });
  res.json(record);
});

export const findAll = asyncWrapper(async (req, res, next) => {
  const { page, limit, offset } = res.pagination;
  const records = await User.findAndCountAll({
    offset,
    limit,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Company,
        required: false,
        attributes: ["id", "name"],
      },
      {
        model: Skill,
        required: false,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Project,
        required: false,
        attributes: ["id", "title"],
      },
      {
        model: Job,
        required: false,
        attributes: ["id", "title"],
        include: [
          {
            model: Company,
            required: false,
            attributes: ["id", "name"],
          },
        ],
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

export const updateOne = asyncWrapper(async (req, res, next) => {
  const avatar = req.file ? req.cloudinaryURL : null;
  const {
    params: { id },
    body,
  } = req;
  let newBody = {}
  avatar ? newBody = {...body, avatar}: newBody = {...body} ;
  console.log({...body, avatar})
  const [updated] = await User.update(
    newBody,
    {
      where: { id },
    }
  );

  // delete / insert BridgeUserSkills
  const skills = body.skills;
  if (skills) {
    await deleteBridgeUserSkillsByUserId(id);
    for (let i = 0; i < skills.length; i++) {
      await BridgeUserSkill.create({
        UserId: id,
        SkillId: skills[i],
      });
    }
  }

  if (!updated) {
    throw new ErrorResponse("Record not found", 404);
  }
  const updatedRecord = await User.scope("withPassword").findOne({
    where: { id },
    include: [
      {
        model: Company,
        required: false,
        attributes: ["id", "name"],
      },
      {
        model: Skill,
        required: false,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Project,
        required: false,
        attributes: ["id", "title"],
      },
      {
        model: Job,
        required: false,
        attributes: ["id", "title"],
        include: [
          {
            model: Company,
            required: false,
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  });

  res.json(updatedRecord);
});

export const deleteOne = asyncWrapper(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const deleted = await User.destroy({
    where: { id },
  });

  if (!deleted) {
    throw new ErrorResponse("Record not found", 404);
  }
  await deleteBridgeUserSkillsByUserId(id);
  res.status(204).end();
});

/**
 * utility methods
 */

const deleteBridgeUserSkillsByUserId = async (id) => {
  await BridgeUserSkill.destroy({ where: { UserId: id } });
  return true;
};
