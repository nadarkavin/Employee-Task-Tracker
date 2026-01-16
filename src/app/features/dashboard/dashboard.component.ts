import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { TaskService } from '../tasks/task.service';
import { Task } from '../../shared/models/task.model';

interface EmployeeTasks {
  name: string;
  tasks: Task[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // SUMMARY STATS
  totalTasks = 0;
  onTrack = 0;
  warning = 0;
  overdue = 0;
  completed = 0;

  // Employee task list
  allEmployees: EmployeeTasks[] = [];
  filteredEmployees: EmployeeTasks[] = [];
  searchTerm = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    const tasks: Task[] = this.taskService.getTasks();

    // UPDATE SUMMARY STATS 
    this.totalTasks = tasks.length;
    this.onTrack = tasks.filter(t => t.status === 'ON_TRACK').length;
    this.warning = tasks.filter(t => t.status === 'WARNING').length;
    this.overdue = tasks.filter(t => t.status === 'OVERDUE').length;
    this.completed = tasks.filter(t => t.status === 'COMPLETED').length;

    // Group by employee
    const grouped = new Map<string, Task[]>();
    tasks.forEach(task => {
      if (!grouped.has(task.assignedTo)) {
        grouped.set(task.assignedTo, []);
      }
      grouped.get(task.assignedTo)!.push(task);
    });

    this.allEmployees = Array.from(grouped.entries()).map(([name, tasks]) => ({
      name,
      tasks
    }));

    this.allEmployees.sort((a, b) => a.name.localeCompare(b.name));
    this.filteredEmployees = [...this.allEmployees];
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredEmployees = [...this.allEmployees];
      return;
    }

    this.filteredEmployees = this.allEmployees.filter(emp =>
      emp.name.toLowerCase().includes(term) ||
      emp.tasks.some(task =>
        task.title.toLowerCase().includes(term) ||
        (task.description && task.description.toLowerCase().includes(term))
      )
    );
  }
}