import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VotingOverviewComponent } from './voting-overview.component';

describe('VotingOverviewComponent', () => {
	let component: VotingOverviewComponent;
	let fixture: ComponentFixture<VotingOverviewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [VotingOverviewComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(VotingOverviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
