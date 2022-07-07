import { dragEndEvent, offset } from "./types";
import addGlobalEventListner from "./utils/addGlobalEventListener";

const HIDE = "hide";

export default function setupDnd(onDragEnd: (event: dragEndEvent) => any) {
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
    setupDragEvents(selectedItem, itemClone, ghost, offset, onDragEnd);
  });
}

function setupDragEvents(
  selectedItem: HTMLElement,
  itemClone: HTMLElement,
  ghost: HTMLElement,
  offset: offset,
  onDragEnd: Function
) {
  const pointerMoveFunction = (event: PointerEvent) => {
    positionClone(itemClone, event, offset);
    const dropZone = getDropZone(event.target as Element);
    if (dropZone == null) return;
    // Gets closet child of dropzone
    const closetChild = Array.from(dropZone.children).find((child) => {
      const rect = child.getBoundingClientRect();
      return event.clientY < rect.top + rect.height / 2;
    });

    if (closetChild != null) {
      dropZone.insertBefore(ghost, closetChild);
    } else {
      dropZone.append(ghost);
    }
  };

  document.addEventListener("pointermove", pointerMoveFunction);
  document.addEventListener(
    "pointerup",
    () => {
      document.removeEventListener("pointermove", pointerMoveFunction);
      const dropZone = getDropZone(ghost);
      if (dropZone) {
        onDragEnd({
          startZone: getDropZone(selectedItem),
          endZone: dropZone,
          dragElement: selectedItem,
          index: Array.from(dropZone.children).indexOf(ghost),
        });
        dropZone.insertBefore(selectedItem, ghost);
      }
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

function getDropZone(element: Element) {
  if (element.matches("[data-drop-zone]")) {
    return element;
  } else {
    return element.closest("[data-drop-zone]");
  }
}
