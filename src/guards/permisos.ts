import { useLogin } from '@/modules/login/stores/login.js';

const store = useLogin();

const permisosGuard = (to, from, next) => {
  if (to.meta.requiresAuth) {
    const adminID = store.credentials.adminID;

    if (adminID === 0) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
};

export default permisosGuard;
