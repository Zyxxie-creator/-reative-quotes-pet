import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { addUser, findUser } from '../users';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  const { username, password } = await request.json();

  const existingUser = findUser(username);
  if (existingUser) {
    return new Response('Пользователь уже существует', { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  addUser(username, passwordHash, token);

  return new Response(JSON.stringify({ token }), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
}