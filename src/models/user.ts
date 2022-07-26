// import { login, register } from '@/networks/user';
import { Effect, Reducer } from 'umi';

export interface UserState {
  username: string;
  isLoginSuccess: boolean;
}

const UserModel = {
  state: {
    username: '未登录',
    isLoginSuccess: false,
  } as UserState,
  effects: {
    register: function* ({ payload }, { call, put }) {
      try {
        const response = yield call(register, payload);
      } catch (e) {
        console.error(e);
        yield put({
          type: 'doSetLoginState',
          payload: { username: '未登录', isLoginSuccess: false, token: '' },
        });
      }
    },
    login: function* ({ payload }, { call, put }) {
      try {
        const response = yield call(login, payload);
        if (response) {
          yield put({
            type: 'doSetLoginState',
            payload: {
              username: decode(response.username),
              isLoginSuccess: response.isLoginSuccess,
              token: response.token,
            },
          });
        } else {
          throw new Error('user/login网络请求正常，但是response为空');
        }
      } catch (e) {
        console.error(e);
        yield put({
          type: 'doSetLoginState',
          payload: { username: '未登录', isLoginSuccess: false, token: '' },
        });
      }
    },
  } as Record<string, Effect>,
  reducers: {
    doSetLoginState: function (state, action) {
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        username: action.payload.username,
        isLoginSuccess: action.payload.isLoginSuccess,
      };
    },
  } as Record<string, Reducer<UserState>>,
};

export default UserModel;
