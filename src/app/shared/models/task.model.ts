export type TaskStatus = 'ON_TRACK' | 'WARNING' | 'OVERDUE' | 'COMPLETED';

export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  startDate: string;
  endDate: string;
  status: TaskStatus;
}