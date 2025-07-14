"use client";
import React, { useState, useEffect } from 'react';
import "../assets/styles/Header.css";
import { Button, ConfigProvider, Layout, Menu, Drawer } from 'antd';
import { ArrowRightOutlined, DownOutlined, MenuOutlined, RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

import styled from 'styled-components';
import Image_logo from "../assets/image/GroupLogo.png"

const StyledMenu = styled(Menu)`
  .ant-menu-item {
    flex: 1;
    text-align: left;
    min-width: 50px;
  }

  .ant-menu-submenu-title {
    width: 150px;
    // text-align: center;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }

  .ant-menu-title-content{
    font-family: 'DM Sans';
  }

  .ant-menu-item:hover::after {
    border-bottom-color: transparent !important;
  }

  .ant-menu-submenu:hover .ant-menu-title::after {
    border-bottom-color: transparent !important;
  }

  .ant-menu-item-active::after,
  .ant-menu-item-selected::after,
  .ant-menu-submenu-active .ant-menu-title::after,
  .ant-menu-submenu-selected .ant-menu-title::after {
    border-bottom-color:  transparent !important;
  }

  .ant-menu-submenu .ant-menu-item:hover {
    background-color: transparent !important;
    color: inherit !important;
  }

  .ant-menu-submenu .ant-menu-item:hover::after {
    border-bottom-color: transparent !important;
  }
`;



export default function Header() {
  const router = useRouter();
  const { Header } = Layout;
  const [current, setCurrent] = useState('home');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modeMobile, setModeMobile] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // 
  
  const items = [
    { label: 'Home', key: 'home', path: '/' },
    // { label: 'Track Records', key: 'trackrecord', path: '/Page/Trackrecords' },
    // { label: 'Our Team', key: 'ourteam', path: '/Page/OurTeam' },
    // { label: 'Business Reorientation', key: 'businessRT', path: '/Page/BusinessReorientation' },
    // { label: 'Financial Solutions', key: 'finacialSolutions', path: '/Page/FinacialSolutions' },
    // { label: 'Strategic Solutions', key: 'strategicSolutions', path: '/Page/StrategicSolutions' },
    // { label: 'Contact Us', key: 'contactus', path: '/Page/Contactus' },
    // { label: 'Knowledge', key: 'knowledge', path: '/Page/Knowledge' },
    // { key: 'getintouch'},
    // {
    //   label: (
    //     <>
    //       Service {modeMobile ? '' : openSubMenu ? <DownOutlined style={{ fontSize: '10px' }} /> : <RightOutlined style={{ fontSize: '10px' }} />}
    //     </>
    //   ),
    //   key: 'service',
    //   children: [
    //     { label: 'Knowledge', key: 'knowledge' },
    //     { label: 'Our Team', key: 'ourteam' },
    //     { label: 'Business Reorientation', key: 'businessRT' },
    //     { label: 'Strategic Solutions', key: 'strategicSolutions' },
    //     { label: 'Financial Solutions', key: 'finacialSolutions' },
    //   ],
    // },
  ];
  

  const onClick = (e) => {
    const clickedItem = items.find(item => item.key === e.key);
    if (clickedItem?.path) {
      router.push(clickedItem.path);
      sessionStorage.setItem('active_nav', e.key)
      setCurrent(e.key);
    }
  };

  const onOpenChange = (keys) => {
    setOpenSubMenu(keys.length > 0);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
        setModeMobile(true);
      } else {
        setModeMobile(false);
      };
    };

  }, []);

  useEffect(() => {
    let getNav = sessionStorage.getItem("active_nav");
    setCurrent(getNav)
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
            // colorBgBase: 'white',
            colorText: '#000000',
            colorLink: '#1890ff',
          }
        }}
      >
        <Layout className="sticky-header">
          <Header className={isSticky ? 'sticky' : 'not-sticky'}>
            <div className="demo-logo">
              <img
                src={Image_logo.src}
                alt="Logo"
              />
            </div>

            <div></div>
            <div></div>
            <Menu
              // theme="light"
              mode="horizontal"
              onClick={onClick}
              onOpenChange={onOpenChange}
              className="custom-menu"
              selectedKeys={[current]}
              style={{
                flex: 1,
                fontSize: "16px",
                minWidth: 0,
                maxWidth: "900px",
                backgroundColor: "transparent",
                border: "none",
                display: modeMobile ? "none" : "flex",
                fontWeight: 400,
                justifyContent: "end",
                padding: 0,
              }}
            >
              {/* <Menu.Item theme="light" key="home">
                Home
              </Menu.Item> */}

              {/* <Menu.SubMenu 
                key="service"
                title={(
                  <>
                    Service {modeMobile ? '' : openSubMenu ? <DownOutlined style={{ fontSize: '10px' }} /> : <RightOutlined style={{ fontSize: '10px' }} />}
                  </>
                )}
              > */}
                {/* <Menu.Item key="knowledge" selectedKeys={[current]}>Knowledge Sharing</Menu.Item> */}
                {/* <Menu.Item key="ourteam"selectedKeys={[current]}>Our Team</Menu.Item> */}
                {/* <Menu.Item key="businessRT"selectedKeys={[current]}>Business Reorientation</Menu.Item>
                <Menu.Item key="strategicSolutions"selectedKeys={[current]}>Strategic Solutions</Menu.Item>
                <Menu.Item key="finacialSolutions"selectedKeys={[current]}>Finacial Solutions</Menu.Item>

              </Menu.SubMenu> */}

              {/* <Menu.Item key="trackrecord">
                Track Records
              </Menu.Item> */}
              {/* <Menu.Item key="ourteam">
                ourTeam
              </Menu.Item> */}

              {/* <Menu.Item key="contactus">
                Contact us
              </Menu.Item> */}
              <Menu.Item key="getintouch">
                <Button
                  style={{
                    backgroundColor: "#CF982C",
                    width: "179px",
                    height: "50px",
                    border: "none",
                    outline: "none",
                    color: "black",
                    fontWeight: "500",
                    borderRadius: "50px",
                    
                  }}
                  onMouseEnter={(e) => e.target.style.color = "black"}
                  onMouseLeave={(e) => e.target.style.color = "black"}
                >
                  Get in touch  <ArrowRightOutlined style={{ fontSize: '14px', fontWeight: "bolder", color: "black" }} />
                </Button>
              </Menu.Item>
            </Menu>

            {modeMobile && (
              <>
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  onClick={() => setDrawerVisible(true)}
                  className="menu-toggle-btn"
                  style={{
                    display: 'flex',
                  }}
                />

                <Drawer
                  title="Menu"
                  placement="right"
                  onClose={() => setDrawerVisible(false)}
                  visible={drawerVisible}
                  bodyStyle={{ padding: 0 }}
                >
                  <StyledMenu
                    className="custom-menu"
                    theme='light'
                    mode="inline"
                    onClick={(e) => {
                      onClick(e);
                      setDrawerVisible(false);
                    }}
                    onOpenChange={onOpenChange}
                    selectedKeys={[current]}
                    items={items}
                  />
                </Drawer>
              </>
            )}
          </Header>
        </Layout>
      </ConfigProvider>
    </>
  );
}
