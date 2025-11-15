export class Todo {
  id: number;
  created_at: string;
  title: string;
  time: number;
  completed: boolean;

  constructor(
    id: number,
    created_at: string,
    title: string,
    time: number,
    completed: boolean
  ) {
    this.id = id;
    this.created_at = created_at;
    this.title = title;
    this.time = time;
    this.completed = completed;
  }
}
