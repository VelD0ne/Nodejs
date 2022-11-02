import { Request, Response } from 'express';

export async function welcomePage(req: Request, res: Response) {
  res
    .status(200)
    .send('Welcome to the most epic server of all time, server of Daniil Volosevich The Greatest');
}
