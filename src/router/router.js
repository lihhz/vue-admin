import SysUser from '../views/sys-user/SysUser.vue';
import SysRole from '../views/sys-role/SysRole.vue';
import UserRole from '../views/user-role/UserRole.vue';
import Login from '../views/Login.vue';
// import App from '../App'

let router = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/sysUser',
    name: 'sysUser',
    component: SysUser
  },
  {
    path: '/sysRole',
    name: 'sysRole',
    component: SysRole
  },
  {
    path: '/userRole',
    name: 'userRole',
    component: UserRole
  }
];
export default router;
