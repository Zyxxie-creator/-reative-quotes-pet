import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  const { token } = await request.json();

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const newToken = jwt.sign({ username: decoded.username }, JWT_SECRET, { expiresIn: '1h' });

    return new Response(JSON.stringify({ token: newToken }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Ошибка проверки токена:", error);
    return new Response('Неверный токен', { status: 401 });
  }
}