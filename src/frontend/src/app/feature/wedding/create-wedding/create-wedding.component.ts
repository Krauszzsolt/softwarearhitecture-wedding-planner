import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { NewWeddingDto } from 'src/app/shared/client';
import { WeddingManagementService } from '../service/wedding-management.service';

@Component({
  selector: 'app-create-wedding',
  templateUrl: './create-wedding.component.html',
  styleUrls: ['./create-wedding.component.scss'],
})
export class CreateWeddingComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router, private weddingManagementService: WeddingManagementService, private authService: AuthService) {}

  wedding: FormGroup;
  loading = false;
  error = '';
  newWeddingDto: NewWeddingDto;
  url: string | ArrayBuffer = 'https://localhost:44329/images/book-cover-placeholder.png';

  ngOnInit(): void {
    this.wedding = this.formBuilder.group({
      name: ['', Validators.required],
      bethrothedOne: ['', Validators.required],
      bethrothedTwo: ['', Validators.required],
      date: [''],
    });
  }

  get f() {
    return this.wedding.controls;
  }

  create() {
    this.newWeddingDto = {
      bethrothedOne: this.f.bethrothedOne.value,
      bethrothedTwo: this.f.bethrothedTwo.value,
      name: this.f.name.value,
      date: this.f.date.value,
    };
    this.weddingManagementService.add(this.newWeddingDto).subscribe((x) => {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      user.weddingId = x.id;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.authService.updateUser();
      this.router.navigateByUrl('/task');
    });
  }

  onFileChange(event) {}
}
