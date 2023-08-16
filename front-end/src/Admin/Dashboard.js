import React, { useEffect } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import {
  UserOutlined,
  ProfileOutlined,
  BankOutlined,
  SolutionOutlined,
  TransactionOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/admin/login');
  };

  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" selectedKeys={[]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/admin/profile">Profile</Link>
          </Menu.Item>
          <Menu.SubMenu key="submenu" icon={<BankOutlined />} title="E-Payment System">
            <Menu.Item key="3" icon={<SolutionOutlined />}>
              <Link to="/admin/agents">Agents</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<SolutionOutlined />}>
              <Link to="/admin/service-providers">Service Providers</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<UserOutlined />}>
              <Link to="/admin/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<TransactionOutlined />}>
              <Link to="/admin/transactions">Transactions</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="header-icons">
            <Link to="/admin/profile">
              <Avatar className="header-icon" icon={<ProfileOutlined />} />
            </Link>
            <Link to="/admin/login" onClick={handleLogout}>
              <LogoutOutlined className="header-icon" />
            </Link>
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          {/* Add your content here based on the selected route */}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;