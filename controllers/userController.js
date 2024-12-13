import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Company, Job, User, BridgeUserSkill, Skill } from "../db.js";
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

  const user = await User.scope("withPassword").findOne({ where: { email } });

  if (!user)
    throw new ErrorResponse("Forbidden. Invalid email or password", 403);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    throw new ErrorResponse("Forbidden. Invalid email or password", 403);

  const payload = { id: user.id, email: user.email };

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
