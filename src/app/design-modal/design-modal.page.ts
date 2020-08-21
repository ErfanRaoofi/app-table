import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-design-modal',
  templateUrl: './design-modal.page.html',
  styleUrls: ['./design-modal.page.scss'],
})
export class DesignModalPage implements OnInit {
  scrollLengh: number;
  scrollNewLengh: number;
  modalScrollNewLengh: number;
  images: any[] = [];
  imageCount;
  slideIndex = 1;

  @ViewChild('imageContainer', { read: ElementRef })
  public imageContainer: ElementRef<any>;

  @ViewChild('img', { read: ElementRef }) public img: ElementRef<any>;

  constructor(private elementRef: ElementRef) {}

  onSelectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.scrollLengh = this.imageContainer.nativeElement.scrollWidth;
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        reader.onload = (event: any) => {
          //   console.log(event.target.result);
          this.images.push({
            id: Math.floor(1000 * Math.random() * 9000),
            src: event.target.result,
          });
          console.log(event);

          setTimeout(() => {
            this.scrollNewLengh = this.imageContainer.nativeElement.scrollWidth;
          }, 0);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removeImage(id): void {
    // const b = this.images.filter((e) => e === event);
    // b.forEach((f) =>
    //   this.images.splice(
    //     this.images.findIndex((e) => e === f),
    //     1
    //   )
    // );
    this.images = this.images.filter((c) => c.id !== id);
    setTimeout(() => {
      this.scrollNewLengh = this.imageContainer.nativeElement.scrollWidth;
    }, 0);
  }

  scrollRight(): void {
    this.imageContainer.nativeElement.scrollTo({
      left: this.imageContainer.nativeElement.scrollLeft + 320,
      behavior: 'smooth',
    });
  }

  scrollLeft(): void {
    this.imageContainer.nativeElement.scrollTo({
      left: this.imageContainer.nativeElement.scrollLeft - 320,
      behavior: 'smooth',
    });
  }
  ngOnInit(): void {}

  openModal(): void {
    document.getElementById('myModal').style.display = 'block';
    this.imageCount = this.images.length;
    this.modalScrollNewLengh = this.img.nativeElement.scrollWidth;
  }

  closeModal(): void {
    document.getElementById('myModal').style.display = 'none';
  }

  plusSlides(n): void {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n): void {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n): void {
    // const i;
    const slides = document.getElementsByClassName(
      'mySlides'
    ) as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName('demo') as HTMLCollectionOf<
      HTMLElement
    >;
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[this.slideIndex - 1].style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
  }

  modalScrollRight(): void {
    this.img.nativeElement.scrollTo({
      left: this.img.nativeElement.scrollLeft + 320,
      behavior: 'smooth',
    });
  }

  modalScrollLeft(): void {
    this.img.nativeElement.scrollTo({
      left: this.img.nativeElement.scrollLeft - 320,
      behavior: 'smooth',
    });
  }
}
