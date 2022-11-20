// import React, { useState } from "react";
// import cn from "classnames";
// import styles from "./ProfileUser.module.sass";
// import Icon from "../../components/Icon";
// import Profile from "../../components/Profile";
// import Modal from "../../components/Modal";

// const parametersUser = [
//   {
//     title: "Indentity verified",
//     icon: "tick",
//   },
// ];

// const socials = [
//   {
//     title: "twitter",
//     url: "https://twitter.com/",
//   },
//   {
//     title: "instagram",
//     url: "https://www.instagram.com/",
//   },
//   {
//     title: "facebook",
//     url: "https://www.facebook.com/",
//   },
// ];

// const ProfileUser = () => {
//   const [visible, setVisible] = useState(false);
//   return (
//     <>
//       <div className={styles.section}>
//         <div className={styles.body}>
//           <div className={cn("container", styles.container)}>
//             <Profile
//               className={styles.profile}
//               parametersUser={parametersUser}
//               socials={socials}
//               buttonText="Message"
//             >
//               <div className={cn(styles.avatar, styles.big)}>
//                 <img src="/images/content/avatar.jpg" alt="Avatar" />
//               </div>
//               <button
//                 className={styles.update}
//                 onClick={() => setVisible(true)}
//               >
//                 <Icon name="pencil" size="20" />
//                 Update your avatar
//               </button>
//               <div className={cn("h4", styles.man)}></div>
//               <div className={cn(styles.note)}></div>
//             </Profile>
//             <div className={styles.wrapper}>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Modal
//         visible={visible}
//         onClose={() => setVisible(false)}
//         outerClassName={styles.outer}
//       >
//         <div className={styles.file}>
//           <input className={styles.load} type="file" />
//           <div className={styles.icon}>
//             <Icon name="upload-file" size="48" />
//           </div>
//           <div className={styles.format}>Drag and drop the photo here</div>
//           <div className={styles.note}>or click to open a selection window</div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default ProfileUser;
