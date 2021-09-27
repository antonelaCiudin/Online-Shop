import { getUsers } from '../api.js';
import DashboardMenu from '../components/DashboardMenu.js';

const UsersScreen = {
  after_render: () => {},
  render: async () => {
    const users = await getUsers();
    return `
    <div class="dashboard">
    ${DashboardMenu.render({ selected: 'users' })}
    <div class="dashboard-content">
      <h1>Users</h1>
      <div class="product-list">
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PASSWORD</th>
              <th class="tr-action">ACTION</th>
            <tr>
          </thead>
          <tbody>
            ${users
        }
          </tbody>
        </table>
      </div>
    </div>
  </div>
    `;
  },
};
export default UsersScreen;