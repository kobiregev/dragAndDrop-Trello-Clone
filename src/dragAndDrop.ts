import addGlobalEventListner from "./utils/addGlobalEventListener";

const HIDE = "hide";

export type offset = {
  x: number;
  y: number;
};

export default function setupDnd() {
  addGlobalEventListner("pointerdown", "[data-draggable]", (event) => {
    const selectedItem = event.target as HTMLElement;
    const itemClone = selectedItem.cloneNode(true) as HTMLElement;
    const ghost = selectedItem.cloneNode() as HTMLElement;
    const offset = setupDragItems(
      selectedItem,
      itemClone,
      ghost,
      event as PointerEvent
    );
    setupDragEvent(selectedItem, itemClone, ghost, offset);
  });
}

function setupDragEvent(
  selectedItem: HTMLElement,
  itemClone: HTMLElement,
  ghost: HTMLElement,
  offset: offset
) {
  const pointerMoveFunction = (event: PointerEvent) => {
    positionClone(itemClone, event, offset);
  };
  document.addEventListener("pointermove", pointerMoveFunction);
  document.addEventListener(
    "pointerup",
    () => {
      document.removeEventListener("pointermove", pointerMoveFunction);
      stopDrag(selectedItem, itemClone, ghost);
    },
    { once: true }
  );
}

function setupDragItems(
  selectedItem: HTMLElement,
  itemClone: HTMLElement,
  ghost: HTMLElement,
  event: PointerEvent
): offset {
  const { clientX, clientY } = event as PointerEvent;
  const originalItemRect = selectedItem.getBoundingClientRect();
  const offset: offset = {
    x: clientX - originalItemRect.left,
    y: clientY - originalItemRect.top,
  };
  selectedItem.classList.add(HIDE);

  itemClone.style.width = `${originalItemRect.width}px`;
  itemClone.classList.add("dragging");
  positionClone(itemClone, event as PointerEvent, offset);
  document.body.append(itemClone);

  ghost.style.height = `${originalItemRect.height}px`;
  ghost.classList.add("ghost");
  ghost.innerHTML = "";
  selectedItem.parentElement?.insertBefore(ghost, selectedItem);

  return offset;
}

function positionClone(
  itemClone: HTMLElement,
  pointerPosition: PointerEvent,
  offset: offset
) {
  itemClone.style.top = `${pointerPosition.clientY - offset.y}px`;
  itemClone.style.left = `${pointerPosition.clientX - offset.x}px`;
}

function stopDrag(
  selectedItem: HTMLElement,
  itemClone: HTMLElement,
  ghost: HTMLElement
) {
  selectedItem.classList.remove(HIDE);
  itemClone.remove();
  ghost.remove();
}
