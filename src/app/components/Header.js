"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import { Layout, Menu, Drawer, Button, ConfigProvider } from 'antd';
import {
  DownOutlined,
  RightOutlined,
  ArrowRightOutlined,
  MenuOutlined,
} from '@ant-design/icons';

import "../assets/styles/Header.css";
import Image_logo from "../assets/image/GroupLogo.png";

const StyledMenu = styled(Menu)`
  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover {
    color: #CF982C !important;
    background-color: transparent !important;
  }

  .ant-menu-item-selected,
  .ant-menu-submenu-selected {
    color: #CF982C !important;
    background-color: transparent !important;
    border-bottom: 2px solid #CF982C;
    font-weight: bold;
  }

  .ant-menu-item::after,
  .ant-menu-submenu-title::after {
    border-bottom: none !important;
  }

  .ant-menu-title-content {
    font-family: 'DM Sans';
  }
`;

export default function Header() {
  const router = useRouter();
  const { Header } = Layout;

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [current, setCurrent] = useState('home');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const savedKey = sessionStorage.getItem('active_nav') || 'home';
    setCurrent(savedKey);

    const handleScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', key: 'home', path: '/' },
    {
      label: (
        <>
          Service{' '}
          {!isMobile &&
            (openSubMenu ? (
              <DownOutlined style={{ fontSize: 10 }} />
            ) : (
              <RightOutlined style={{ fontSize: 10 }} />
            ))}
        </>
      ),
      key: 'service',
      children: [
        { label: 'Knowledge Sharing', key: 'knowledge', path: '/Page/Knowledge' },
        { label: 'Our Team', key: 'ourteam', path: '/Page/OurTeam' },
        { label: 'Business Reorientation', key: 'businessRT', path: '/Page/BusinessReorientation' },
        { label: 'Strategic Solutions', key: 'strategicSolutions', path: '/Page/StrategicSolutions' },
        { label: 'Finacial Solutions', key: 'finacialSolutions', path: '/Page/FinacialSolutions' },
      ],
    },
    { label: 'Track Records', key: 'trackrecord', path: '/Page/Trackrecords' },
    { label: 'Contact Us', key: 'contactus', path: '/Page/Contactus' },
  ];

  const flattenItems = (items) =>
    items.flatMap(item => (item.children ? item.children : item));

  const onClick = (e) => {
    const flat = flattenItems(menuItems);
    const clicked = flat.find(i => i.key === e.key);

    if (clicked?.path) {
      router.push(clicked.path);
      sessionStorage.setItem('active_nav', e.key);
      setCurrent(e.key);
    }
  };

  const onOpenChange = (keys) => {
    setOpenSubMenu(keys.includes('service'));
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: '#000000',
          colorLink: '#353637ff',
        },
      }}
    >
      <Layout className="sticky-header">
        <Header className={isSticky ? 'sticky' : 'not-sticky'}>
          <div className="demo-logo">
            <img src={Image_logo.src} alt="Logo" />
          </div>

          {/* Desktop Menu */}
          {!isMobile && (
            <StyledMenu
              className="custom-menu"
              mode="horizontal"
              items={menuItems}
              selectedKeys={[current]}
              onClick={onClick}
              onOpenChange={onOpenChange}
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            />
          )}

          {/* Right Section (Hamburger + Get in touch) */}
          <div className="header-right">
            {isMobile && (
              <>
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  onClick={() => setDrawerVisible(true)}
                  className="menu-toggle-btn"
                />
                <Drawer
                  title="Menu"
                  placement="right"
                  onClose={() => setDrawerVisible(false)}
                  open={drawerVisible}
                  bodyStyle={{ padding: 0 }}
                >
                  <StyledMenu
                    mode="inline"
                    items={menuItems}
                    selectedKeys={[current]}
                    onClick={(e) => {
                      onClick(e);
                      setDrawerVisible(false);
                    }}
                    onOpenChange={onOpenChange}
                  />
                </Drawer>
              </>
            )}

            {/* ปุ่ม Get in touch */}
            {isMobile ? (
              <Button
                className="get-in-touch-btn-circle"
                onClick={() => {
                  router.push('/Page/Contactus');
                  sessionStorage.setItem('active_nav', 'contactus');
                  setCurrent('contactus');
                }}
              >
                <ArrowRightOutlined style={{ fontSize: '20px', color: 'black' }} />
              </Button>
            ) : (
              <Button
                className="get-in-touch-btn"
                onClick={() => {
                  router.push('/Page/Contactus');
                  sessionStorage.setItem('active_nav', 'contactus');
                  setCurrent('contactus');
                }}
              >
                Get in touch <ArrowRightOutlined />
              </Button>
            )}
          </div>
        </Header>
      </Layout>
    </ConfigProvider>
  );
}
