import { UserOutlined, LogoutOutlined, KeyOutlined, UnorderedListOutlined, ScheduleOutlined, TableOutlined } from '@ant-design/icons'

import { Button, Dropdown, Layout, Menu, Space } from 'antd';
import React, { useEffect } from 'react';

import logo from './logo.svg';
import './index.css'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUserName, getCurrentUserRole, ROLE_ADMIN, ROLE_STAFF } from '../authorization';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useState } from 'react';

import ChangePasswordModal from '../components/user/ChangePasswordModal'

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<NavLink end to='/staff'>Hồ sơ của tôi</NavLink>, '1', <UserOutlined />),
  getItem(<NavLink end to='/staff/course'>Quản lý khóa học</NavLink>, '2', <UnorderedListOutlined />),
  getItem(<NavLink end to='/staff/user/student'>Quản lý học viên</NavLink>, '3', <UserOutlined />),
  getItem(<NavLink end to='/staff/classroom'>Quản lý lớp học</NavLink>, '4', <ScheduleOutlined />),
  getItem(<NavLink end to='/staff/lecture'>Quản lý bài giảng</NavLink>, '5', <TableOutlined />),
  getItem(<NavLink end to='/staff/register'>Quản lý ĐK lớp học</NavLink>, '6', <TableOutlined />)
];

const App = () => {

  const history = useNavigate()
  const location = useLocation()
  const [isLoginModalShowing, setLoginModalShowing] = useState(false);
  
  const [currentUserName, setCurrentUserName] = useState('');

  useEffect(() => {
    const currentRole = getCurrentUserRole()
    if (currentRole != ROLE_ADMIN && currentRole != ROLE_STAFF) {
      window.localStorage.removeItem('USER_DATA');
      window.location.href = '/login/';
    }
    setCurrentUserName(getCurrentUserName())
  }, [history])

  function handleLogout() {
    window.localStorage.removeItem('USER_DATA')
    window.location.href = '/login/';
  }

  const navItems = [
    {
      key: '1',
      label: (
        <Button
          onClick={() => setLoginModalShowing(true)}
          icon={<KeyOutlined />}
          type='text'
        >
          Đổi mật khẩu
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button
          onClick={handleLogout.bind(this)}
          icon={<LogoutOutlined />}
          type='text' color='red' danger
        >
          Đăng xuất
        </Button>
      ),
    },
  ];

  return (
    <Layout hasSider>
      <ChangePasswordModal isShowing={isLoginModalShowing} setShowing={setLoginModalShowing}/>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo">
          <img src={logo} />
        </div>
        <Menu style={{ marginTop: '0px' }} theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <Space style={{float: 'right'}}>
            <Dropdown
              menu={{
                items: navItems,
              }}
              placement="bottomRight"
            >
              <Button
                type='text'
                icon={<UserOutlined />}
              >
                Xin chào, {currentUserName}
              </Button>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            minHeight: 'calc(100vh - 200px + 24px + 16px)'
          }}
        >
          <div
            className="site-layout-background"
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          
        </Footer>
      </Layout>
    </Layout>
  )
}
export default App;