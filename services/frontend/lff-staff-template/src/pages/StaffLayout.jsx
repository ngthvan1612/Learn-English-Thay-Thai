import { UserOutlined, UnorderedListOutlined, ScheduleOutlined,LogoutOutlined, BookOutlined, TableOutlined } from '@ant-design/icons'

import { Layout, Menu } from 'antd';
import React, { useEffect } from 'react';

import logo from './logo.svg';
import './index.css'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUserRole, ROLE_STAFF } from '../authorization';

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
  getItem(<NavLink end to='/staff/register'>Quản lý ĐK lớp học</NavLink>, '6', <TableOutlined />),
  getItem(
    <NavLink end to="/login" onClick={ () => localStorage.USER_DATA = undefined}>
      Đăng xuất
    </NavLink>,
    "7",
    <LogoutOutlined />
  ),
];

const App = () => {

  const history = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const currentRole = getCurrentUserRole()
    if (currentRole != ROLE_STAFF)
    {
      history('/login')
    }
  },[history])

  return (
    <Layout hasSider>
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
        />
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
            <Outlet/>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Mẫu thiết kế dựa trên <a href='https://ant.design/'>Ant design 2018</a><br/>
          <span style={{color: 'red', fontWeight: 'bold'}}>Bản quyền được bảo lưu - Nhóm 01 CNPM</span>
        </Footer>
      </Layout>
    </Layout>
  )
}
export default App;