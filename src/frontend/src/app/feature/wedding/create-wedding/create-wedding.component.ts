import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-wedding',
  templateUrl: './create-wedding.component.html',
  styleUrls: ['./create-wedding.component.scss'],
})
export class CreateWeddingComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  wedding: FormGroup;
  loading = false;
  error = '';

  url: string | ArrayBuffer = 'https://localhost:44329/images/book-cover-placeholder.png';

  ngOnInit(): void {
    this.wedding = this.formBuilder.group({
      title: ['', Validators.required],
      responsible: [''],
      name: [''],
    });
  }

  get f() {
    return this.wedding.controls;
  }

  onFileChange(event) {}



}
