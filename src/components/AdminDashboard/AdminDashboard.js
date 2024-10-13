import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './index.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users'); 
        setUsers(response.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users.'); 
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">User Submissions</h2>
      {error && <p className="dashboard-error" style={{ color: 'red' }}>{error}</p>}
      {users.length > 0 ? (
        <table className="dashboard-table">
          <thead className="dashboard-table-head">
            <tr className="dashboard-table-row">
              <th className="dashboard-table-heading">Name</th>
              <th className="dashboard-table-heading">Social Media Handle</th>
              <th className="dashboard-table-heading">Images</th>
            </tr>
          </thead>
          <tbody className="dashboard-table-body">
            {users.map((user) => (
              <tr key={user._id} className="dashboard-table-row">
                <td className="dashboard-table-data">{user.name}</td>
                <td className="dashboard-table-data">{user.handle}</td>
                <td className="dashboard-table-data">
                  {user.images.map((image, index) => (
                    <a
                      key={index}
                      href={image.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dashboard-image-link"
                    >
                      <img
                        src={image}
                        alt="user submission"
                        width="50"
                        height="50"
                        className="dashboard-image-thumbnail"
                      />
                    </a>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="dashboard-no-submissions">No submissions yet.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
