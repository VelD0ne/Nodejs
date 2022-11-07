import { NextFunction, Request, Response } from 'express';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import User from '../entity/user.entity';
import UserRepository from '../repository/user.repostory';

export const users: Array<User> = new Array<User>();

export async function getProfile(req: Request, res: Response) {
  const username = req.user?.username;
  if (!username) {
    return res.sendStatus(401);
  }
  console.log(req.session);
  console.log(req.user);
  console.log(`User username: ${username}`);
  return res.json(username);
}

export async function loginJWT(req: Request, res: Response) {
  const { username } = req.body;

  // const user = users.find((elem) => elem.username === username);
  const user = await UserRepository.findOneBy({
    username,
  });

  if (!user || !user.password)
    return res.json({
      message: 'User with this username does not exist',
    });

  if (!compareSync(req.body.password, user.password)) {
    return res.json({ message: 'Incorrect password' });
  }

  if (!process.env.JWT_TOKEN) {
    return res.status(500).send('JWT token was not found');
  }

  const payload = { username };
  const accessToken = jwt.sign(payload, process.env.JWT_TOKEN);
  return res.json({ accessToken });
}

export async function registration(req: Request, res: Response) {
  const { username } = req.body;

  const user = await UserRepository.findOneBy({
    username,
  });

  if (user) {
    return res.json({ message: 'User with this username alredy exists' });
  }

  const { password } = req.body;
  const id = randomUUID();
  const newUser = await UserRepository.create({ username, password, id });
  await UserRepository.save(newUser);
  return res.sendStatus(200);
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  req.session?.destroy((err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    return res.redirect('/');
  });
}
