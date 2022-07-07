export type Task = {
  id: string;
  body: string;
};
export type List = {
  id: string;
  title: string;
  tasks?: Task[];
};
