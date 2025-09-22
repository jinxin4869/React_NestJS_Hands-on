import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser, User } from './api/user';
import './App.css';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingEmail, setEditingEmail] = useState('');

  useEffect(() => {
    void fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('API fetch error:', err);
      setUsers([]);
    }
  };

  const handleAddUser = async () => {
    if (!name || !email) return;

    // 重複チェック
    if (users.some(u => u.email === email)) {
      alert('このメールアドレスは既に登録されています');
      return;
    }

    try {
      const newUser = await createUser({ name, email });
      setUsers(prev => [...prev, newUser]);
      setName(''); setEmail('');
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditingName(user.name);
    setEditingEmail(user.email);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
    setEditingEmail('');
  };

  const submitEdit = async () => {
    if (editingId == null) return;
    try {
      const updated = await updateUser(editingId, { name: editingName, email: editingEmail });
      setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
      cancelEdit();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('本当に削除しますか？')) return;
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ユーザー登録</h1>

      <div style={{ marginBottom: 20 }}>
        <input placeholder="名前" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="メール" value={email} onChange={e => setEmail(e.target.value)} />
        <button onClick={handleAddUser}>追加</button>
      </div>

      <h2>ユーザー一覧</h2>

      <ul>
        {Array.isArray(users) && users.map(u => (
          <li key={u.id}>
            {editingId === u.id ? (
              <>
                <input value={editingName} onChange={e => setEditingName(e.target.value)} />
                <input value={editingEmail} onChange={e => setEditingEmail(e.target.value)} />
                <button className="save" onClick={submitEdit}>保存</button>
                <button className="cancel" onClick={cancelEdit}>キャンセル</button>
              </>
            ) : (
              <>
                {u.name} ({u.email})
                <button className="edit" onClick={() => startEdit(u)}>編集</button>
                <button className="delete" onClick={() => handleDelete(u.id)}>削除</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
