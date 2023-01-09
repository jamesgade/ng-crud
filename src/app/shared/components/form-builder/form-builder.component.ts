import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

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
    const group = this.formBuilder.group({
      additionalInfo: this.formBuilder.array([])
    });

    this.fields.forEach((field: any) => {
      if (field.multipleValues === undefined) {
        group.addControl(field.name, new FormControl('', this.getValidators(field)));
      } else {
        group.addControl(field.name, new FormArray([
          this.formBuilder.control('', this.getValidators),
          // this.formBuilder.control('', this.getValidators),
          // this.formBuilder.control('', this.getValidators),
        ]));
      }
      // } else{
      //   console.log(field.multipleValues.name);
      //   group.addControl(field.multipleValues.name, new FormArray([
      //     this.formBuilder.control('', this.getValidators)
      //     // new FormControl('', this.getValidators)
      //   ]))
      // }
    })
    return group;
  }

  // ADDTITIONAL INFO
  get additionalInfo(){
    return this.customForm.get('additionalInfo') as FormArray;
  }
  addMoreInfo() {
    this.additionalInfo.push(this.formBuilder.control(''));
  }
  removeInfo = (i: any) => {
    this.additionalInfo.removeAt(i)
  }

  onSubmit = () => {
    console.log(this.customForm)
    // console.log(`REQ: ${this.customForm.controls.[field.name].controls}`);

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
    if (field.type === 'email') {
      validators.push(Validators.email);
    }
    return validators;
  }

}
