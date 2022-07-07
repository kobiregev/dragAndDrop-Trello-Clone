import addGlobalEventListner from "./utils/addGlobalEventListener";

export default function setupDnd() {
  addGlobalEventListner("pointerdown", "[data-draggable]", (e) => {
    console.log("down");
    const pointerMoveFunction = () => {
      console.log("move");
    };
    document.addEventListener("pointermove", pointerMoveFunction);
    document.addEventListener(
      "pointerup",
      () => {
        document.removeEventListener("pointermove", pointerMoveFunction);
        console.log("up");
      },
      { once: true }
    );
  });
}
