import React from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.less';

const validateUsername = (value) => {
  const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if (reg.test(value)) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }

  return {
    validateStatus: 'error',
    errorMsg: 'Wrong Input! Please input your mail',
  };
};

const validatePassword = (value) => {
  const reg = /^[\D]+$/;
  if (!reg.test(value)) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: 'Wrong Input! Please input numeric password',
  };
};
class Indexpage extends React.Component {
  state = {
    username: {
      value: '',
    },
    password: {
      value: '',
    },
  };

  handleSubmit = () => {
    this.handlePasswordChange(this.state.password.value);
    this.handleUsernameChange(this.state.username.value);
  };

  handleUsernameChange = (value) => {
    // console.log( "username", value);

    this.setState({
      username: {
        ...validateUsername(value),
        value,
      },
    });
  };

  handlePasswordChange = (value) => {
    // console.log("password", value);

    this.setState({
      password: {
        ...validatePassword(value),
        value,
      },
    });
  };

  usernameChange = (e) => {
    this.setState({ username: { value: e.target.value } });
  };

  passwordChange = (e) => {
    this.setState({ password: { value: e.target.value } });
  };

  render() {
    const { username } = this.state;
    const { password } = this.state;
    const usenameTips = 'Please input your mail';
    const passwordTips = 'Please input numeric password';
    return (
      <div className={styles.container}>
        <Form>
          <Form.Item
            validateStatus={username.validateStatus}
            help={username.errorMsg || usenameTips}
          >
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              value={username.value}
              onChange={this.usernameChange}
            />
          </Form.Item>
          <Form.Item
            validateStatus={password.validateStatus}
            help={password.errorMsg || passwordTips}
          >
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              onChange={this.passwordChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.handleSubmit}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Indexpage;
