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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.customForm = this.createForm();
  }

  createForm = () => {
    const group = this.formBuilder.group({});
    this.fields.forEach((field: any) => {
      group.addControl(field.name, new FormControl(''));
    })
    return group;
  }

  onSubmit = () => {
    if(this.customForm.valid){
      this.formValue.emit(this.customForm.value);
    }
  }

}
