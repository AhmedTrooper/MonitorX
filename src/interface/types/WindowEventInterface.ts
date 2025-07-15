export interface WindowEvent {
  id: number;
  timestamp: string;
  duration: number;
  data: {
    app: string;
    title: string;
  };
}
