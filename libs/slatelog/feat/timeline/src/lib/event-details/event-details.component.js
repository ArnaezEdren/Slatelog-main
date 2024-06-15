'use strict';
var __assign =
	(this && this.__assign) ||
	function () {
		__assign =
			Object.assign ||
			function (t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i];
					for (var p in s)
						if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
				}
				return t;
			};
		return __assign.apply(this, arguments);
	};
var __esDecorate =
	(this && this.__esDecorate) ||
	function (
		ctor,
		descriptorIn,
		decorators,
		contextIn,
		initializers,
		extraInitializers
	) {
		function accept(f) {
			if (f !== void 0 && typeof f !== 'function')
				throw new TypeError('Function expected');
			return f;
		}
		var kind = contextIn.kind,
			key = kind === 'getter' ? 'get' : kind === 'setter' ? 'set' : 'value';
		var target =
			!descriptorIn && ctor
				? contextIn['static']
					? ctor
					: ctor.prototype
				: null;
		var descriptor =
			descriptorIn ||
			(target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
		var _,
			done = false;
		for (var i = decorators.length - 1; i >= 0; i--) {
			var context = {};
			for (var p in contextIn) context[p] = p === 'access' ? {} : contextIn[p];
			for (var p in contextIn.access) context.access[p] = contextIn.access[p];
			context.addInitializer = function (f) {
				if (done)
					throw new TypeError(
						'Cannot add initializers after decoration has completed'
					);
				extraInitializers.push(accept(f || null));
			};
			var result = (0, decorators[i])(
				kind === 'accessor'
					? { get: descriptor.get, set: descriptor.set }
					: descriptor[key],
				context
			);
			if (kind === 'accessor') {
				if (result === void 0) continue;
				if (result === null || typeof result !== 'object')
					throw new TypeError('Object expected');
				if ((_ = accept(result.get))) descriptor.get = _;
				if ((_ = accept(result.set))) descriptor.set = _;
				if ((_ = accept(result.init))) initializers.unshift(_);
			} else if ((_ = accept(result))) {
				if (kind === 'field') initializers.unshift(_);
				else descriptor[key] = _;
			}
		}
		if (target) Object.defineProperty(target, contextIn.name, descriptor);
		done = true;
	};
var __runInitializers =
	(this && this.__runInitializers) ||
	function (thisArg, initializers, value) {
		var useValue = arguments.length > 2;
		for (var i = 0; i < initializers.length; i++) {
			value = useValue
				? initializers[i].call(thisArg, value)
				: initializers[i].call(thisArg);
		}
		return useValue ? value : void 0;
	};
var __setFunctionName =
	(this && this.__setFunctionName) ||
	function (f, name, prefix) {
		if (typeof name === 'symbol')
			name = name.description ? '['.concat(name.description, ']') : '';
		return Object.defineProperty(f, 'name', {
			configurable: true,
			value: prefix ? ''.concat(prefix, ' ', name) : name,
		});
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.EventDetailsComponent = void 0;
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var rxjs_1 = require('rxjs');
var forms_1 = require('@angular/forms');
var validators_1 = require('../../../../createevent/src/lib/createevent/validators');
var delete_confirm_snackbar_component_1 = require('./delete-confirm-snackbar.component'); // Import MatSnackBar
var EventDetailsComponent = (function () {
	var _classDecorators = [
		(0, core_1.Component)({
			selector: 'frontend-event-details',
			standalone: true,
			imports: [
				common_1.CommonModule,
				router_1.RouterLink,
				forms_1.FormsModule,
				forms_1.ReactiveFormsModule,
			],
			providers: [common_1.DatePipe],
			templateUrl: './event-details.component.html',
			styleUrls: ['./event-details.component.css'],
		}),
	];
	var _classDescriptor;
	var _classExtraInitializers = [];
	var _classThis;
	var EventDetailsComponent = (_classThis = /** @class */ (function () {
		function EventDetailsComponent_1(
			fb,
			route,
			http,
			eventHttpService,
			router,
			datePipe,
			snackBar // Inject MatSnackBar
		) {
			this.fb = fb;
			this.route = route;
			this.http = http;
			this.eventHttpService = eventHttpService;
			this.router = router;
			this.datePipe = datePipe;
			this.snackBar = snackBar;
			this.events = [];
			this.filteredEvents = [];
			this.updateMode = false;
			this.formInvalid = false;
			this.createForm2 = this.fb.group({
				title: [
					'',
					[forms_1.Validators.required, forms_1.Validators.minLength(3)],
				],
				description: ['', [forms_1.Validators.maxLength(500)]],
				street: ['', [forms_1.Validators.required]],
				city: ['', [forms_1.Validators.required]],
				zipCode: [
					'',
					[
						forms_1.Validators.required,
						forms_1.Validators.pattern(/^[0-9]{4,}$/),
					],
				],
				state: ['', [forms_1.Validators.required]],
				deadlineDate: [
					'',
					[
						forms_1.Validators.required,
						(0, validators_1.futureDateValidator)(),
					],
				],
				deadlineTime: ['', [forms_1.Validators.required]],
				timePoints: this.fb.array([], validators_1.noOverlapValidator),
				invitations: this.fb.array([], validators_1.atLeastOneEmailValidator),
			});
		}
		EventDetailsComponent_1.prototype.ngOnInit = function () {
			var _this = this;
			this.route.params.subscribe(function (params) {
				_this.eventId = params['eventId'];
				_this.getEvents();
			});
		};
		EventDetailsComponent_1.prototype.getEvents = function () {
			var _this = this;
			this.http.get('api/timeline').subscribe(function (events) {
				_this.events = events;
				_this.filteredEvents = _this.events.filter(function (event) {
					return _this.isEventId(event.id);
				});
				_this.filteredEvents.forEach(function (event) {
					event.pollOptions = event.poll.pollOptions || [];
					event.pollCloseDate = event.poll.pollCloseDate;
					event.pollResults = Object.keys(event.poll.pollOptions).map(function (
						key
					) {
						var pollOption = event.poll.pollOptions[key];
						return {
							dateTime: key,
							yesCount: pollOption.filter(function (vote) {
								return vote.voteOption === 'Yes';
							}).length,
							noCount: pollOption.filter(function (vote) {
								return vote.voteOption === 'No';
							}).length,
							maybeCount: pollOption.filter(function (vote) {
								return vote.voteOption === 'Maybe';
							}).length,
						};
					});
				});
				// Optionally, reset the form with the updated event data
				if (_this.filteredEvents.length > 0) {
					_this.setFormData(_this.filteredEvents[0]);
				}
			});
		};
		Object.defineProperty(
			EventDetailsComponent_1.prototype,
			'timePointsControls',
			{
				get: function () {
					return this.createForm2.get('timePoints');
				},
				enumerable: false,
				configurable: true,
			}
		);
		Object.defineProperty(
			EventDetailsComponent_1.prototype,
			'invitationsControls',
			{
				get: function () {
					return this.createForm2.get('invitations');
				},
				enumerable: false,
				configurable: true,
			}
		);
		EventDetailsComponent_1.prototype.getTimePointsArray = function () {
			return this.timePointsControls.controls;
		};
		EventDetailsComponent_1.prototype.getInvitationsArray = function () {
			return this.invitationsControls.controls;
		};
		EventDetailsComponent_1.prototype.isEventId = function (id) {
			var actualId = this.eventId.replace('eventId=', '');
			return actualId === id;
		};
		EventDetailsComponent_1.prototype.toggleUpdateMode = function () {
			var _this = this;
			if (!this.updateMode) {
				this.originalEventData = __assign(
					{},
					this.filteredEvents.find(function (event) {
						return _this.isEventId(event.id);
					})
				);
				this.eventData = __assign({}, this.originalEventData);
				this.setFormData(this.eventData);
			} else {
				this.filteredEvents = this.filteredEvents.map(function (event) {
					if (_this.isEventId(event.id)) {
						return __assign({}, _this.originalEventData);
					}
					return event;
				});
			}
			this.updateMode = !this.updateMode;
		};
		EventDetailsComponent_1.prototype.setFormData = function (event) {
			this.createForm2.patchValue({
				title: event.title,
				description: event.description,
				street: event.location.street,
				city: event.location.city,
				zipCode: event.location.zipCode,
				state: event.location.state,
				deadlineDate: this.datePipe.transform(
					event.pollCloseDate,
					'yyyy-MM-dd'
				),
				deadlineTime: this.datePipe.transform(event.pollCloseDate, 'HH:mm'),
			});
			if (event.poll) {
				this.setTimePoints(event.poll.pollOptions || {});
				this.setInvitations(event.invitations || []);
			} else {
				console.error('Poll data is undefined:', event.poll);
			}
		};
		EventDetailsComponent_1.prototype.setTimePoints = function (pollOptions) {
			var _this = this;
			var timePointsArray = this.timePointsControls;
			timePointsArray.clear(); // Clear existing controls
			if (pollOptions) {
				Object.keys(pollOptions).forEach(function (key) {
					var _a = key.split('T'),
						date = _a[0],
						time = _a[1];
					var formattedTime = time.split('Z')[0];
					// Ensure formattedTime is in hh:mm:ss format
					if (!formattedTime.includes(':')) {
						formattedTime += ':00'; // Append seconds if missing
					} else if (formattedTime.split(':').length === 2) {
						formattedTime += ':00'; // Append seconds if only hours and minutes are provided
					}
					timePointsArray.push(
						_this.fb.group({
							date: [date, forms_1.Validators.required],
							time: [formattedTime, forms_1.Validators.required],
						})
					);
				});
			} else {
				console.error('Poll options are invalid or undefined:', pollOptions);
			}
		};
		EventDetailsComponent_1.prototype.setInvitations = function (invitations) {
			var _this = this;
			var invitationsArray = this.invitationsControls;
			invitationsArray.clear(); // Clear existing controls
			if (invitations && Array.isArray(invitations)) {
				invitations.forEach(function (invitation) {
					invitationsArray.push(
						_this.fb.group({
							email: [
								invitation.email,
								[forms_1.Validators.required, forms_1.Validators.email],
							],
						})
					);
				});
			} else {
				console.error('Invitations data is invalid or undefined:', invitations);
			}
		};
		EventDetailsComponent_1.prototype.addInvitation = function () {
			this.invitationsControls.push(
				this.fb.group({
					email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
				})
			);
		};
		EventDetailsComponent_1.prototype.removeInvitation = function (index) {
			this.invitationsControls.removeAt(index);
		};
		EventDetailsComponent_1.prototype.addTimePoint = function () {
			this.timePointsControls.push(
				this.fb.group({
					date: ['', forms_1.Validators.required],
					time: ['', forms_1.Validators.required],
				})
			);
		};
		EventDetailsComponent_1.prototype.removeTimePoint = function (index) {
			this.timePointsControls.removeAt(index);
		};
		EventDetailsComponent_1.prototype.updateEvent = function () {
			var _this = this;
			if (this.createForm2.valid) {
				var actualId = this.eventId.replace('eventId=', '');
				this.eventData = this.formatEventData(this.createForm2.value);
				this.eventHttpService
					.updateEvent(actualId, this.eventData)
					.pipe(
						(0, rxjs_1.catchError)(function (error) {
							console.error('Error updating event:', error);
							return (0, rxjs_1.throwError)(error);
						})
					)
					.subscribe(function () {
						console.log('Event updated successfully');
						_this.updateMode = false;
						// Reload the events to refresh the data
						_this.getEvents();
					});
			} else {
				this.validateAllFormFields(this.createForm2);
				this.formInvalid = true;
				console.log('Form is not valid');
			}
		};
		EventDetailsComponent_1.prototype.confirmPollOption = function (
			eventId,
			dateTime
		) {
			// Extract the date and time from the selected dateTime string
			var _a = dateTime.split('T'),
				date = _a[0],
				timeWithZ = _a[1];
			var time = timeWithZ.split('Z')[0];
			// Remove all other time points except the selected one
			this.createForm2.setControl(
				'timePoints',
				this.fb.array(
					[
						this.fb.group({
							date: [date, forms_1.Validators.required],
							time: [time, forms_1.Validators.required],
						}),
					],
					validators_1.noOverlapValidator
				)
			);
			// Update the deadline date to the current date and the deadline time to one hour ago
			var currentDate = new Date();
			var oneHourAgo = new Date(currentDate.getTime() - 60 * 60 * 1000);
			this.createForm2.patchValue({
				deadlineDate: this.datePipe.transform(currentDate, 'yyyy-MM-dd'),
				deadlineTime: this.datePipe.transform(oneHourAgo, 'HH:mm'),
			});
			// Format the event data and update the event
			this.updateEvent();
		};
		EventDetailsComponent_1.prototype.formatEventData = function (formData) {
			var _this = this;
			var formattedTimePoints = formData.timePoints.map(function (tp) {
				// Ensure tp.time is in hh:mm:ss format
				var time = tp.time;
				if (!time.includes(':')) {
					time += ':00'; // Append seconds if missing
				} else if (time.split(':').length === 2) {
					time += ':00'; // Append seconds if only hours and minutes are provided
				}
				// Return the formatted datetime string
				return ''
					.concat(_this.datePipe.transform(tp.date, 'yyyy-MM-dd'), 'T')
					.concat(time, 'Z');
			});
			return {
				title: formData.title,
				description: formData.description,
				locationStreet: formData.street,
				locationCity: formData.city,
				locationZipCode: formData.zipCode,
				locationState: formData.state,
				pollOptions: formattedTimePoints,
				invitationEmails: formData.invitations.map(function (inv) {
					return inv.email;
				}),
				deadlineDate: this.datePipe.transform(
					formData.deadlineDate,
					'yyyy-MM-dd'
				),
				deadlineTime: formData.deadlineTime,
			};
		};
		EventDetailsComponent_1.prototype.deleteEvent = function () {
			var _this = this;
			var actualId = this.eventId.replace('eventId=', '');
			var snackBarRef = this.snackBar.openFromComponent(
				delete_confirm_snackbar_component_1.DeleteConfirmSnackbarComponent,
				{
					data: {
						message: 'Do you really want to delete this Event?',
						onConfirm: function () {
							snackBarRef.dismiss();
							_this.eventHttpService
								.deleteEvent(actualId)
								.pipe(
									(0, rxjs_1.catchError)(function (error) {
										console.error('Error deleting Event:', error);
										_this.snackBar.open('Error deleting Event', 'Close', {
											duration: 3000,
										});
										return (0, rxjs_1.throwError)(error);
									})
								)
								.subscribe({
									next: function () {
										console.log('Successfully deleted Event');
										_this.snackBar.open('Successfully deleted Event', 'Close', {
											duration: 3000,
										});
										_this.router.navigate(['/timeline']);
									},
								});
						},
						onCancel: function () {
							snackBarRef.dismiss();
						},
					},
				}
			);
		};
		EventDetailsComponent_1.prototype.goBack = function () {
			this.router.navigate(['/timeline']);
		};
		EventDetailsComponent_1.prototype.downloadIcsFile = function (base64Data) {
			var binaryString = window.atob(base64Data);
			var bytes = new Uint8Array(binaryString.length);
			for (var i = 0; i < binaryString.length; i++) {
				bytes[i] = binaryString.charCodeAt(i);
			}
			var blob = new Blob([bytes.buffer], { type: 'text/calendar' });
			var link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = 'event.ics';
			link.click();
		};
		EventDetailsComponent_1.prototype.validateAllFormFields = function (
			formGroup
		) {
			var _this = this;
			Object.keys(formGroup.controls).forEach(function (field) {
				var control = formGroup.get(field);
				if (control instanceof forms_1.FormControl) {
					control.markAsTouched({ onlySelf: true });
				} else if (control instanceof forms_1.FormGroup) {
					_this.validateAllFormFields(control);
				} else if (control instanceof forms_1.FormArray) {
					control.controls.forEach(function (group) {
						_this.validateAllFormFields(group);
					});
				}
			});
		};
		EventDetailsComponent_1.prototype.isFutureDate = function (pollCloseDate) {
			var now = new Date();
			var pollClose = new Date(pollCloseDate);
			return pollClose > now;
		};
		return EventDetailsComponent_1;
	})());
	__setFunctionName(_classThis, 'EventDetailsComponent');
	(function () {
		var _metadata =
			typeof Symbol === 'function' && Symbol.metadata
				? Object.create(null)
				: void 0;
		__esDecorate(
			null,
			(_classDescriptor = { value: _classThis }),
			_classDecorators,
			{ kind: 'class', name: _classThis.name, metadata: _metadata },
			null,
			_classExtraInitializers
		);
		EventDetailsComponent = _classThis = _classDescriptor.value;
		if (_metadata)
			Object.defineProperty(_classThis, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata,
			});
		__runInitializers(_classThis, _classExtraInitializers);
	})();
	return (EventDetailsComponent = _classThis);
})();
exports.EventDetailsComponent = EventDetailsComponent;
