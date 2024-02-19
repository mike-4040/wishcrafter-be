import { Response, NextFunction } from "express";

import { AuthedRequest, FirebaseError } from "../../type";
import { UserError, asString } from "../../utils";
import { createUser, getUserByEmail } from "../../models/user";
import { createAuthUser, createCustomToken } from "../../services";

const AUTH_USER_EXISTS_ERRORS = [
  "auth/email-already-exists",
  "auth/uid-already-exists",
] as const;

export async function signUp(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;

    const email = asString(body.email, "signUpEmail");
    const password = asString(body.password, "signUpPassword");
    const firstName = asString(body.firstName, "signUpFirstName");

    const dbUser = await getUserByEmail(email).catch(cause => {
      throw new Error("signUpLookupFailed", { cause });
    });

    if (dbUser?.auth_created) {
      throw new UserError("signUpAccountExists");
    }

    let id = dbUser?.id;

    if (!id) {
      const newDbUser = await createUser(email, firstName).catch(cause => {
        throw new Error("signUp-creationFailed-1", { cause });
      });

      ({ id } = newDbUser);
    }

    if (!id) {
      throw new Error("signUp-creationFailed-2");
    }

    const authUser = await createAuthUser({
      id,
      email,
      displayName: firstName,
      password,
    }).catch(cause => {
      const { code } = cause as FirebaseError;

      if (AUTH_USER_EXISTS_ERRORS.includes(code as any)) {
        throw new UserError("signUpAccountAlreadyExists");
      }

      throw new Error("signUpCreateAuthUserFailed", { cause });
    });

    console.dir({ authUser }, { depth: null });

    const customToken = await createCustomToken(id);

    console.log({ customToken });

    res.status(200).send({ success: true, message: "Sign up" });
  } catch (err) {
    next(err);
  }
}
