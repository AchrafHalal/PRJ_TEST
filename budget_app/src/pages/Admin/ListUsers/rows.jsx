import axios from 'axios';



export const fetchRows = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get('http://localhost:8000/api/admin/users', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.users.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  }));
};

export const promoteUser = async (id) => {
  const token = localStorage.getItem('token');
  await axios.put(`http://localhost:8000/api/admin/promote/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const depromoteUser = async (id) => {
  const token = localStorage.getItem('token');
  await axios.put(`http://localhost:8000/api/admin/depromote/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
