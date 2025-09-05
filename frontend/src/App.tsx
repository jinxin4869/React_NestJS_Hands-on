import React, { useState, useEffect } from 'react';
import { getUsers, createUser, User } from './api/user';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // 初回レンダリング時にユーザー一覧を取得
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async () => {
    if (!name || !email) return;
    try {
      const newUser = await createUser({ name, email });
      setUsers(prev => [...prev, newUser]);
      setName('');
      setEmail('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ユーザー一覧</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name} ({u.email})</li>
        ))}
      </ul>

      <h2>ユーザー追加</h2>
      <input
        type="text"
        placeholder="名前"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="メール"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleAddUser}>追加</button>
    </div>
  );
};

export default App;