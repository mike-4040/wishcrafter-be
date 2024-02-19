import { Router } from "express";

import { login, signUp } from "../domains/auth";

export const authRouter = Router()
  .post("/login", login)
  .post("/signup", signUp);
