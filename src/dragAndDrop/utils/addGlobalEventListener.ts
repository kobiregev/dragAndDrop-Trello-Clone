export default function addGlobalEventListner(
  type: keyof DocumentEventMap,
  selector: string,
  callback: (e: Event) => void
) {
  document.addEventListener(type, (event) => {
    if (event.target instanceof Element && event.target.matches(selector))
      callback(event);
  });
}
