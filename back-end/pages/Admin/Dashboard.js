import React from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  ProfileOutlined,
  BankOutlined,
  SolutionOutlined,
  TransactionOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Switch, Route, Link, Router } from 'react-router-dom';

// import ProfilePage from './ProfilePage';
// import AgentsPage from './AgentsPage';
// import ServiceProvidersPage from './ServiceProvidersPage';
// import UsersPage from './UsersPage';
// import TransactionsPage from './TransactionsPage';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Redirect to="/admin/login" />;
  }

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
                <ProfileOutlined className="header-icon" />
              </Link>
              <Link to="/admin/login" onClick={handleLogout}>
                <LogoutOutlined className="header-icon" />
              </Link>
            </div>
          </Header>
          <Content style={{ margin: '16px' }}>
            <Switch>
              <Route exact path="/admin/profile">
                {/* <ProfilePage /> */}
              </Route>
              <Route exact path="/admin/agents">
                {/* <AgentsPage /> */}
              </Route>
              <Route exact path="/admin/service-providers">
                {/* <ServiceProvidersPage /> */}
              </Route>
              <Route exact path="/admin/users">
                {/* <UsersPage /> */}
              </Route>
              <Route exact path="/admin/transactions">
                {/* <TransactionsPage /> */}
              </Route>
              <Redirect to="/admin/profile" />
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Dashboard;