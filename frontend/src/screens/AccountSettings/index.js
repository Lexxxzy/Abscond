import React, { useState } from "react";
import cn from "classnames";
import styles from "./AccountSettings.module.sass";
import Icon from "../../components/Icon";
import Dropdown from "../../components/Dropdown";
import PersonalInfo from "./PersonalInfo";
import LoginAndSecurity from "./LoginAndSecurity";
import Documents from "./Documents";
import { SideMenu } from "./SideMenu";

const items = [
  {
    title: "Personal information",
    icon: "user",
  },
  {
    title: "Documents",
    icon: "wallet",
  },
  {
    title: "Security",
    icon: "lock",
  }
];

const AccountSettings = () => {
  const options = [];
  items.map((x) => options.push(x.title));

  const [activeTab, setActiveTab] = useState(options[0]);
  
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
       <SideMenu items={items} options={options} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.wrapper}>
          {activeTab === options[0] && <PersonalInfo />}
          {activeTab === options[1] && <Documents />}
          {activeTab === options[2] && <LoginAndSecurity />}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
