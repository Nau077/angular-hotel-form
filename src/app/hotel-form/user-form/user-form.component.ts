import {  Input, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl  } from '@angular/forms';
import {ServerService} from '../../shared/server-interact.service';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
	@Input() adultCount: number;
	@Input() middleChildCount: number;
	@Input() littleChildCount: number;
	@Input() period: string;
	@Input() titlePrice: number;
	@Input() date: string;

	userForm: FormGroup;
	constructor(private fb: FormBuilder, private formService: ServerService) { }

	ngOnInit() {
		this.initForm();
	}

	// Инициализация формы
	initForm() {
		this.userForm = this.fb.group({
		name: ['', [
		Validators.required,
		Validators.pattern(/^[a-zа-яё\s]+$/iu)
		]
		],
		email: ['', [
		Validators.required, Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
		],
		],
		phone: ['', [
		Validators.required,
		Validators.pattern(/^((\+7|7|8)+([0-9]){10})$/)
		]
		]
		});
	}

	isControlInvalid(controlName: string): boolean {
		const control = this.userForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	onSubmit() {
		const controls = this.userForm.controls;
		// Проверяем форму на валидность
		if (this.userForm.invalid) {
			// Если форма не валидна, то помечаем все контролы как touched
		Object.keys(controls)
			.forEach(controlName => controls[controlName].markAsTouched());
			// Прерываем выполнение метода
		return;
		}
		// Todo: Обработка данных формы
		// tslint:disable
		console.log(`Кол-во взрослых: ${this.adultCount},
		кол-во детей сред. возраста: ${this.middleChildCount},
		кол-во детей младш.возраста: ${this.littleChildCount}
		тариф: ${this.period}, цена: ${this.titlePrice},
		Дата ${this.date}
		 `)
	}
}
