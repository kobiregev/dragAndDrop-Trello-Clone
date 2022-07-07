export type offset = {
  x: number;
  y: number;
};

export type dragEndEvent = {
  startZone: Element;
  endZone: Element;
  dragElement: HTMLElement;
  index: number;
};
