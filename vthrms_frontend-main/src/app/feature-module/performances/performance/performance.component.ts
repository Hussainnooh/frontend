import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { PerformanceReviewService } from 'src/app/services/performance-review.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
@HostListener('window: resize', ['$event'])
export class PerformanceComponent implements OnInit {
  public innerHeight!: string;
  rows: any = {
    'achievements': [],
    'alterations': [],
    'Professional': [],
  };

  constructor(private ngZone: NgZone, private performanceReviewService: PerformanceReviewService) {
    window.onresize = () => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  ngOnInit(): void {
    this.loadPerformanceReviews();
  }

  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  loadPerformanceReviews() {
    this.performanceReviewService.getAllPerformanceReviews().subscribe(
      data => {
        // Assuming the data structure matches the rows object
        this.rows['achievements'] = data.achievements || [];
        this.rows['alterations'] = data.alterations || [];
        this.rows['Professional'] = data.Professional || [];
      },
      error => {
        console.error('Error loading performance reviews', error);
      }
    );
  }

  addRow(section: string) {
    if (!this.rows[section]) {
      this.rows[section] = [];
    }
    this.rows[section].push({ bySelf: '', roComment: '', hodComment: '' });
  }

  removeRow(section: string, rowIndex: number) {
    if (this.rows[section]) {
      this.rows[section].splice(rowIndex, 1);
    }
  }

  savePerformanceReview() {
    const data = {
      achievements: this.rows['achievements'],
      alterations: this.rows['alterations'],
      Professional: this.rows['Professional']
    };
    this.performanceReviewService.addPerformanceReview(data).subscribe(
      response => {
        console.log('Performance review saved successfully', response);
      },
      error => {
        console.error('Error saving performance review', error);
      }
    );
  }
}
