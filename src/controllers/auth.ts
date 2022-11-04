import { Request, Response } from 'express';
import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../@types/user';

export const users: Array<User> = new Array<User>();

export async function getProfile(req: Request, res: Response) {
  const username =
    req.profile?.name || req.user?.username || 'There is no username';
  console.log(username);
  return res.json(req.profile);
}

export async function loginJWT(req: Request, res: Response) {
  const { username } = req.body;
  const user = users.find((elem) => elem.username === username);

  if (!user)
    return res.json({
      message: 'User with this username does not exist',
    });

  if (!compareSync(req.body.password, user.password))
    return res.json({ message: 'Incorrect password' });

  if (!process.env.JWT_TOKEN)
    return res.status(500).send('JWT token was not found');

  const payload = { username };
  const accessToken = jwt.sign(payload, process.env.JWT_TOKEN);
  return res.json({ accessToken });
}

export async function registration(req: Request, res: Response) {
  const { username } = req.body;

  if (users.find((elem) => elem.username === username))
    return res.json({ message: 'User with this username alredy exists' });

  const { password } = req.body;
  const user: User = new User(username, hashSync(password, 10));
  users.push(user);
  return res.sendStatus(200);
}
