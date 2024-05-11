import { __decorate } from 'tslib';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineOverviewComponent } from './timeline-overview/timeline-overview.component';
let TimelineContainerComponent = class TimelineContainerComponent {};
TimelineContainerComponent = __decorate(
	[
		Component({
			selector: 'frontend-timeline-container',
			standalone: true,
			imports: [CommonModule, TimelineOverviewComponent],
			template: `<frontend-timeline-overview></frontend-timeline-overview>`,
			styles: [],
		}),
	],
	TimelineContainerComponent
);
export { TimelineContainerComponent };
//# sourceMappingURL=timeline-container.component.js.map
