import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findUser } from '../users';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  const { username, password } = await request.json();

  const user = findUser(username);
  
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return new Response('Неверные учетные данные', { status: 401 });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  return new Response(JSON.stringify({ token }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}