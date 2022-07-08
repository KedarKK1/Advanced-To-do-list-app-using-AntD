import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
// import { Menu, Switch } from 'antd';

const Navbar = () => {

    const [current, setCurrent] = useState('mail');
    const theme = 'dark'
    // const [theme, setTheme] = useState('dark');
    // const [current1, setCurrent1] = useState('1');

    // const changeTheme = (value) => {
    //     setTheme(value ? 'dark' : 'light');
    //   };

    const items = [
        {
          label: 'Home',
          key: 'mail',
          icon: <MailOutlined />,
        },
        // {
        //   label: 'Navigation Two',
        //   key: 'app',
        //   icon: <AppstoreOutlined />,
        //   disabled: true,
        // },
        // {
        //   label: 'Navigation Three - Submenu',
        //   key: 'SubMenu',
        //   icon: <SettingOutlined />,
        //   children: [
        //     {
        //       type: 'group',
        //       label: 'Item 1',
        //       children: [
        //         {
        //           label: 'Option 1',
        //           key: 'setting:1',
        //         },
        //         {
        //           label: 'Option 2',
        //           key: 'setting:2',
        //         },
        //       ],
        //     },
        //     {
        //       type: 'group',
        //       label: 'Item 2',
        //       children: [
        //         {
        //           label: 'Option 3',
        //           key: 'setting:3',
        //         },
        //         {
        //           label: 'Option 4',
        //           key: 'setting:4',
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   label: (
        //     <a href="/signup" target="_blank" rel="noopener noreferrer">
        //       Navigation Four - Link
        //     </a>
        //   ),
        //   key: 'alipay',
        // },
        
        // {
        //     label: (
        //     <Switch
        //         checked={theme === 'dark'}
        //         onChange={changeTheme}
        //         checkedChildren="Dark"
        //         unCheckedChildren="Light"
        //     />
        //     ),
        //     key: "themecol",
        // },
      ];
      
    
      const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
      };

    //   const changeMode = (value) => {
    //     setMode(value ? 'vertical' : 'inline');
    //   };
    


  return (
    <div>
        
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" theme={theme} items={items} />
        {/* <Menu onClick={onClick} defaultSelectedKeys={['1']}  mode="horizontal" theme={theme} items={items} /> */}

    </div>
  )
}

export default Navbar;