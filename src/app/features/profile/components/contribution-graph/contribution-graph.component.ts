import { Component, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { LucideAngularModule } from 'lucide-angular';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-contribution-graph',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule, LucideAngularModule],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts: () => import('echarts') })
    }
  ],
  template: `
    <div class="contribution-layout">
      <div class="contribution-container">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h2 class="section-title">1,753 contributions in the last year</h2>
          <div class="settings">Contribution settings ▼</div>
        </div>
        
        <div class="graph-wrapper" *ngIf="isBrowser">
          <div echarts [options]="chartOption" class="echarts-graph"></div>
        </div>

        <div class="legend d-flex align-items-center justify-content-between mt-2 mb-4">
          <div class="learn-more">Learn how we count contributions</div>
          <div class="d-flex align-items-center gap-1">
            <span class="text-muted small">Less</span>
            <span class="cell level-0"></span>
            <span class="cell level-1"></span>
            <span class="cell level-2"></span>
            <span class="cell level-3"></span>
            <span class="cell level-4"></span>
            <span class="text-muted small">More</span>
          </div>
        </div>

        <div class="activity-overview-section">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="section-title">Activity overview</h3>
            <div class="d-flex gap-2">
              <button class="org-btn">
                <img src="https://avatars.githubusercontent.com/u/1089146?s=64&v=4" width="16" height="16" />
                &#64;UptimeAI
              </button>
              <button class="org-btn">
                <img src="https://avatars.githubusercontent.com/u/1089146?s=64&v=4" width="16" height="16" />
                &#64;timescale
              </button>
            </div>
          </div>
          
          <div class="overview-content d-flex">
            <div class="summary-text">
              <div class="d-flex align-items-start gap-2 mb-2">
                <lucide-icon name="git-commit" [size]="16" class="mt-1"></lucide-icon>
                <div>
                  Contributed to <a href="#">UptimeAI/uptime_webapp</a>, <a href="#">UptimeAI/uptime_server</a>, <a href="#">UptimeAI/uptime_ml</a> and 13 other repositories
                </div>
              </div>
            </div>
            <div class="chart-container" *ngIf="isBrowser">
               <div echarts [options]="activityChartOption" class="overview-chart"></div>
               <div class="chart-labels">
                 <span class="label-commits">83% Commits</span>
                 <span class="label-prs">17% Pull requests</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div class="years-list">
        <button *ngFor="let year of years" 
                class="year-item" 
                [class.active]="year === activeYear">
          {{ year }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .contribution-layout {
      display: flex;
      gap: 24px;
      margin-top: 24px;
    }
    .contribution-container {
      flex: 1;
      border: 1px solid var(--gh-border);
      border-radius: 6px;
      padding: 16px;
    }
    .years-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 80px;
    }
    .year-item {
      background: transparent;
      border: none;
      padding: 8px 16px;
      font-size: 12px;
      color: var(--gh-text-primary);
      cursor: pointer;
      border-radius: 6px;
      text-align: left;
      width: 100%;
      transition: 0.2s;
      
      &:hover {
        background-color: var(--gh-btn-hover);
      }
      
      &.active {
        background-color: #0969da;
        color: #ffffff;
        font-weight: 600;
      }
    }
    .section-title {
      font-size: 16px;
      font-weight: 400;
      margin: 0;
      color: var(--gh-text-primary);
    }
    .settings {
      font-size: 12px;
      color: var(--gh-text-secondary);
      cursor: pointer;
      &:hover { color: var(--gh-link); }
    }
    .graph-wrapper {
      overflow-x: auto;
      overflow-y: hidden;
    }
    .echarts-graph {
      height: 128px;
      width: 100%;
      min-width: 650px;
    }
    .legend {
      font-size: 12px;
      color: var(--gh-text-secondary);
      
      .learn-more {
        color: var(--gh-text-secondary);
        cursor: pointer;
        &:hover { color: var(--gh-link); }
      }
      
      .cell {
        width: 10px;
        height: 10px;
        border-radius: 2px;
        display: inline-block;
        
        &.level-0 { background-color: var(--gh-contribution-green-0); }
        &.level-1 { background-color: var(--gh-contribution-green-1); }
        &.level-2 { background-color: var(--gh-contribution-green-2); }
        &.level-3 { background-color: var(--gh-contribution-green-3); }
        &.level-4 { background-color: var(--gh-contribution-green-4); }
      }
    }
    
    .activity-overview-section {
      border-top: 1px solid var(--gh-border);
      padding-top: 24px;
      margin-top: 16px;
    }
    
    .org-btn {
      background: #fff;
      border: 1px solid var(--gh-border);
      border-radius: 2em;
      padding: 4px 12px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      color: var(--gh-text-primary);
      cursor: pointer;
      transition: 0.2s;
      
      img { border-radius: 50%; }
      &:hover { background: var(--gh-btn-hover); border-color: #8b949e; }
    }
    
    .overview-content {
      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
    .summary-text {
      font-size: 14px;
      flex: 1;
      color: var(--gh-text-secondary);
      a { font-weight: 600; color: var(--gh-text-primary); text-decoration: none; &:hover { color: var(--gh-link); text-decoration: underline; } }
    }
    .chart-container {
      flex: 1;
      height: 180px;
      position: relative;
    }
    .overview-chart {
      width: 100%;
      height: 100%;
    }
    .chart-labels {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      
      .label-commits {
        position: absolute;
        left: 10%;
        top: 50%;
        font-size: 10px;
        color: var(--gh-text-secondary);
      }
      .label-prs {
        position: absolute;
        right: 10%;
        bottom: 20%;
        font-size: 10px;
        color: var(--gh-text-secondary);
      }
    }
    
    @media (max-width: 768px) {
      .contribution-layout {
        flex-direction: column;
      }
      .years-list {
        flex-direction: row;
        overflow-x: auto;
        padding-bottom: 8px;
      }
      .year-item {
        width: auto;
        white-space: nowrap;
      }
    }
  `]
})
export class ContributionGraphComponent implements OnInit {
  @Input() data: any[] = []; // Expecting [date, value] array

  chartOption: EChartsOption = {};
  isBrowser: boolean;

  years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013];
  activeYear = 2025;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.initChart();
      this.initActivityChart();
    }
  }

  initChart() {
    // Generate mock data if none provided, just to be safe, but service should provide it
    // The heatmap calendar in ECharts

    const today = new Date();
    const rangeStart = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const rangeEnd = new Date(today);

    this.chartOption = {
      tooltip: {
        position: 'top',
        formatter: function (p: any) {
          const format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
          return format + ': ' + p.data[1] + ' contributions';
        },
        backgroundColor: '#24292f',
        textStyle: { color: '#ffffff' },
        padding: [5, 10],
        extraCssText: 'border-radius: 6px;'
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: false,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
        show: false, // Hiding default legend to use custom one
        inRange: {
          color: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
        }
      },
      calendar: {
        top: 20,
        left: 0,
        right: 0,
        cellSize: ['auto', 13],
        range: [rangeStart, rangeEnd],
        itemStyle: {
          borderWidth: 3, // Spacing between blocks
          borderColor: '#fff'
        },
        splitLine: {
          show: false
        },
        yearLabel: { show: false },
        dayLabel: {
          firstDay: 1, // Start on Monday
          nameMap: ['Sun', '', 'Mon', '', 'Wed', '', 'Fri', ''],
          color: '#57606a',
          fontSize: 9
        },
        monthLabel: {
          color: '#57606a',
          fontSize: 9
        }
      },
      series: [{
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: this.data
      }]
    };
  }

  activityChartOption: EChartsOption = {};

  initActivityChart() {
    this.activityChartOption = {
      radar: {
        indicator: [
          { name: 'Code review', max: 100 },
          { name: 'Issues', max: 100 },
          { name: 'Pull requests', max: 100 },
          { name: 'Commits', max: 100 }
        ],
        radius: '65%',
        splitNumber: 4,
        axisName: {
          color: '#57606a',
          fontSize: 11
        },
        splitLine: {
          lineStyle: {
            color: '#d0d7de'
          }
        },
        splitArea: {
          show: false
        }
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [0, 0, 17, 83],
              name: 'Activity',
              itemStyle: { color: '#2da44e' },
              areaStyle: { opacity: 0.2 },
              symbol: 'circle',
              symbolSize: 6
            }
          ]
        }
      ]
    };
  }
}

// Need to declare echarts for the formatter function to work if not importing it directly in the function scope
declare const echarts: any;
