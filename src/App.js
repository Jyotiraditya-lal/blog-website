import { useState, useEffect } from 'react';
import Home from './components/home/Home';
import Create from './components/create/Create';
import Profile from './components/profile/Profile';
import Login from './components/login/Logn';
import YourBlogs from './components/yourBlogs/YourBlogs';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersString = localStorage.getItem('users');
    if (!usersString) {
      const initialUsers = [
        {
          id: 1,
          name: 'Vaibhav lal',
          password: '1234567',
          email: 'vaibhav@user.com',
          imgUrl:
            'https://img.freepik.com/premium-photo/profile-icon-white-background_941097-162373.jpg?w=740',
        },
        {
          id: 2,
          name: 'Rajat lal',
          password: '1234567',
          email: 'rajat@user.com',
          imgUrl:
            'https://img.freepik.com/premium-photo/profile-icon-white-background_941097-162373.jpg?w=740',
        },
        {
          id: 3,
          name: 'Ayush kumar',
          password: '1234567',
          email: 'ayush@user.com',
          imgUrl:
            'https://img.freepik.com/premium-photo/profile-icon-white-background_941097-162373.jpg?w=740',
        },
        {
          id:4,
          name: 'Harsh sharma',
          password: '1234567',
          email: 'harsh@user.com',
          imgUrl:
            'https://img.freepik.com/premium-photo/profile-icon-white-background_941097-162373.jpg?w=740',
        },
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
      setUsers(initialUsers);
    } else {
      setUsers(JSON.parse(usersString));
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/your-blogs" element={<YourBlogs />} />
    </Routes>
  );
}

export default App;
