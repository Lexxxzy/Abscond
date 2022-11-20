// import React from "react";
// import cn from "classnames";
// import styles from "./Main.module.sass";
// import Control from "../../../components/Control";
// import Flight from "../../../components/Flight";

// import { wishlists } from "../../../mocks/wishlists";

// const breadcrumbs = [
//   {
//     title: "Home",
//     url: "/",
//   },
//   {
//     title: "Wishlists",
//   },
// ];

// const Main = () => {

//   return (
//     <div className={cn("section", styles.section)}>
//       <div className={cn("container", styles.container)}>
//         <Control
//           className={styles.control}
//           urlHome="/"
//           breadcrumbs={breadcrumbs}
//         />
//         <div className={styles.head}>
//           <div className={styles.wrap}>
//             <h1 className={cn("h2", styles.title)}>Wish List</h1>
//             <div className={styles.counter}>Quantity: {`${wishlists.items.length}` } </div>
//           </div>
//           <div className={styles.nav}>
          
//               <button
//                 className={cn(styles.link, styles.active)}
//                 key={wishlists.title}
//               >
//                 {wishlists.title}
//               </button>
            
//           </div>
//         </div>
//         <div className={styles.wrapper}>
//             <div className={styles.group}>
//               {
//                 wishlists.items.map((x, index) => (
//                   <Flight className={styles.flight} item={x} key={index} />
//                 ))
//               }
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;
