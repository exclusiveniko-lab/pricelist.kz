import React, { useState, useEffect } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Reset form on open
      setUsername('');
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  const TopoMaxLogo = () => (
    <svg width="200" height="50" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="45" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="#38bdf8">
        TOPOMAX
      </text>
      <text x="10" y="58" fontFamily="Arial, sans-serif" fontSize="10" fill="#f3f4f6">
        ПУТЕШЕСТВУЙ С МЕЧТАМИ
      </text>
    </svg>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password === '123123123') {
      onLogin();
    } else {
      setError('Неверный логин или пароль.');
    }
  };
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-brand-dark-2 rounded-lg shadow-2xl p-8 w-full max-w-sm m-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-center mb-6">
           <TopoMaxLogo />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-brand-light">Вход для администратора</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Логин</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full input-style"
              placeholder="Admin"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full input-style"
              placeholder="•••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
             <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2 rounded-md text-gray-300 hover:bg-gray-600 transition">
              Отмена
            </button>
            <button type="submit" className="w-full flex-1 bg-brand-accent hover:bg-brand-accent-2 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
              Войти
            </button>
          </div>
        </form>
        <style>{`.input-style { background-color: #111827; border: 1px solid #4b5563; border-radius: 0.375rem; padding: 0.5rem 0.75rem; color: #f3f4f6; transition: all 0.2s; } .input-style:focus { ring: 2px; ring-color: #38bdf8; border-color: #38bdf8; outline: none; }`}</style>
      </div>
    </div>
  );
};
