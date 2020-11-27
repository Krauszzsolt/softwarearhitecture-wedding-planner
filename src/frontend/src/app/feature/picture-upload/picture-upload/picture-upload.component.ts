import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from '../service/upload.service';

@Component({
  selector: 'app-picture-upload',
  templateUrl: './picture-upload.component.html',
  styleUrls: ['./picture-upload.component.scss'],
})
export class PictureUploadComponent implements OnInit {
  public picture: FormGroup;
  public loading = false;
  public error = '';
  public id = (this.route.snapshot.paramMap.get('id') as undefined) as number;
  public url: string | ArrayBuffer = '';
  public succes = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private uploadService: UploadService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.picture = this.formBuilder.group({
      coverImageSource: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.picture.controls;
  }

  onFileChange(event) {
    this.succes = false;
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      const file = event.target.files[0];

      // preview
      var reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        console.log(event);
        this.url = (event.currentTarget as any).result;
      };

      // add to form
      this.picture.patchValue({
        coverImageSource: file,
      });
    }
  }

  onSubmit(): void {
    // stop here if form is invalid
    if (this.picture.invalid) {
      return;
    }

    this.loading = true;
    this.uploadService.upload(this.id, this.f.coverImageSource.value).subscribe({
      next: () => {
        this.succes = true;
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });
  }
}
