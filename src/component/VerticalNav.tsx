import React, { useState } from "react";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { FaSeedling } from "react-icons/fa";
import { BiSpa } from "react-icons/bi";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const VerticalNav: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#ffffff", borderRight: "1px solid #f0f0f0" }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            height: "200px",
            textAlign: "center",
            lineHeight: "64px",
            fontWeight: "bold",
            background: "#ffffff",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <img src="src/assets/images/Green Vintage Agriculture and Crops Farming Logo.png" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["/home"]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/home",
              icon: <HomeOutlined />,
              label: "Dashboard",
            },
            {
              key: "/staff",
              icon: <UserOutlined />,
              label: "Staff",
            },
            {
              key: "/field",
              icon: <BiSpa />,
              label: "Field",
            },
            {
              key: "crop",
              icon: <FaSeedling />,
              label: "Crop",
            },
            {
              key: "vehicle",
              icon: <TruckOutlined />,
              label: "Vehicle",
            },
            {
              key: "equipment",
              icon: <FaScrewdriverWrench />,
              label: "Equipment",
            },
            {
              key: "logs",
              icon: <TruckOutlined />,
              label: "Logs",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#ffffff",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#ffffff",
            borderRadius: borderRadiusLG,
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default VerticalNav;
