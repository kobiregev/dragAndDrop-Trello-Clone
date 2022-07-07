import setupDnd from "./dragAndDrop";
import "./style.css";

setupDnd();

const app = document.querySelector<HTMLDivElement>("#app")!;

// app.innerHTML = `
// <div class="lanes">
// <div class="lane">
//   <div class="header">
//     Backlog
//   </div>
//   <div class="tasks">
//     <div class="task">
//       Do Laundry
//     </div>
//     <div class="task">
//       Edit Video
//     </div>
//   </div>
//   <form>
//     <input class="task-input" type="text" placeholder="Task Name" />
//   </form>
// </div>
// <div class="lane">
//   <div class="header">
//     Doing
//   </div>
//   <div class="tasks">
//     <div class="task">
//       Record Video
//     </div>
//   </div>
//   <form>
//     <input class="task-input" type="text" placeholder="Task Name" />
//   </form>
// </div>
// <div class="lane">
//   <div class="header">
//     Done
//   </div>
//   <div class="tasks">
//     <div class="task">
//       Plan Trello Clone Video
//     </div>
//   </div>
//   <form>
//     <input class="task-input" type="text" placeholder="Task Name" />
//   </form>
// </div>
// </div>
// `;
