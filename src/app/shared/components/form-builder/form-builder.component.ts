import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})

export class FormBuilderComponent {
  @Input() fields !: any[];
  @Output() formValue: any = new EventEmitter();
  @Input() buttonLabel: string;

  customForm: FormGroup;
  isSubmitting: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.customForm = this.createForm();
  }

  createForm = () => {
    const group = this.formBuilder.group({});
    this.fields.forEach((field: any) => {
      group.addControl(field.name, new FormControl('', this.getValidators(field)));
    })
    return group;
  }

  onSubmit = () => {
    console.log(this.customForm)
    this.isSubmitting = true;
    
    if (this.customForm.valid) {
      this.formValue.emit(this.customForm.value);
    }
  }

  getValidators = (field: any) => {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength))
    }
    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }
    if(field.type === 'email'){
      validators.push(Validators.email);
    }
    return validators;
  }

}
