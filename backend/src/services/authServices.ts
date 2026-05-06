import { unauthorizedError } from "../errors/unauthorized-error";
import { notFoundError } from "../errors/notFound-error";
import authRepositories from "../repositories/authRepository";
import { Session, User } from "../generated/prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";

async function createUser(name: string, email: string, password: string): Promise<User> {
    const user = await authRepositories.checkDuplicateEmail(email);
    if (user) throw unauthorizedError();

    const hashedPassword = await bcrypt.hash(password, 10);
    return await authRepositories.createNewUser(name, email, hashedPassword);
}

async function loginUser(email: string, password: string): Promise<LoginReponse> {
    const user = await authRepositories.checkDuplicateEmail(email);
    if (!user) throw notFoundError();

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) throw unauthorizedError();

    const session = await authRepositories.findSessionByUserId(user.id);
    if (session) await authRepositories.deleteSession(session.id);

    const token = crypto.randomUUID();
    const createdSession = await authRepositories.createSession(user.id, token)

    return { createdSession, userPassword: password };
}

type LoginReponse = {
    createdSession: Session,
    userPassword: string
}

const authServices ={
    createUser,
    loginUser
}

export default authServices;