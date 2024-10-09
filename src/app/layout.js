import './globals.css';

export default function Layout({ children }) {
  return (
    <html lang="ru">
      <body>
        <header className="bg-gray-800 text-white p-4 text-center">
          <h1 className="text-3xl">Галерея Креативных Цитат</h1>
        </header>
        <main className="container mx-auto p-6">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>© 2024 Галерея Креативных Цитат</p>
        </footer>
      </body>
    </html>
  );
}