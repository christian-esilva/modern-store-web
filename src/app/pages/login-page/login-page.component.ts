import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../validators/custom.validator';
import { DataService } from '../../services/data.service';
import { Ui } from '../../utils/ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  providers: [Ui, DataService]
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public errors: any[] = [];

  constructor(private fb: FormBuilder, private ui: Ui, private dataService: DataService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required
        //,CustomValidator.EmailValidator
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.required
      ])]
    });

    const token = localStorage.getItem('ms.token');
    if (token) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
  }

  showModal() {
    this.ui.setActive('modal');
  }

  hideModal() {
    this.ui.setInactive('modal');
  }

  submit() {
    this.dataService.authenticate(this.form.value).subscribe(result => {
      console.log(result);
      localStorage.setItem('ms.token', result.token);
      localStorage.setItem('ms.user', JSON.stringify(result.user));
      this.router.navigateByUrl('/home');
    }, error => {
      this.errors = JSON.parse(error._body).errors;
    });
  }

}
