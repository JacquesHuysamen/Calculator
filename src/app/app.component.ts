import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DashboardContainerComponent} from "./components/dashboard-container/dashboard-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Calculator';
}
