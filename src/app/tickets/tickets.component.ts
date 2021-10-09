import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  /**
   * dynamicForm: instance of  FormGroup
   * The dynamicForm is then bound to the <form> element in the app template below using the [formGroup] directive.
   * The dynamicForm contain FormControl's
   */
  dynamicForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
  }

  /**
   * numberOfTickets: is an Angular FormControl that stores the number of tickets selected.
   * It is bound to the select input in the app component template with the directive
   *
   * tickets is an Angular FormArray used to hold an array of form groups (FormGroup) for storing ticket holder details.
   * Each ticket form group contains two child form controls, one for the name and one for the email of the ticket holder
   */
  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      numberOfTickets: ['', Validators.required],
      tickets: new FormArray([]) //array of FormGroup
    });
  }

  //getter
  get ticketFormGroups() {
    return (this.dynamicForm.controls.tickets as FormArray).controls as FormGroup[];
  }

  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    if ((this.dynamicForm.controls.tickets as FormArray).length < numberOfTickets) {
      for (let i = (this.dynamicForm.controls.tickets as FormArray).length; i < numberOfTickets; i++) {
        (this.dynamicForm.controls.tickets as FormArray).push(this.formBuilder.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]]
        }));
      }
    } else {
      for (let i = (this.dynamicForm.controls.tickets as FormArray).length; i >= numberOfTickets; i--) {
        (this.dynamicForm.controls.tickets as FormArray).removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    (this.dynamicForm.controls.tickets as FormArray).clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    (this.dynamicForm.controls.tickets as FormArray).reset();
  }

}
