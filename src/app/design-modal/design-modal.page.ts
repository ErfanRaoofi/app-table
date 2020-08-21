import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-design-modal',
  templateUrl: './design-modal.page.html',
  styleUrls: ['./design-modal.page.scss'],
})
export class DesignModalPage implements OnInit {
  ngOnInit(): void {}
  scrollLengh: number;
  ScrollNewLengh: number;
  urls: any[] = [];

  @ViewChild('imageContainer', { read: ElementRef })
  public imageContainer: ElementRef<any>;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.scrollLengh = this.imageContainer.nativeElement.scrollWidth;
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        reader.onload = (event: any) => {
          //   console.log(event.target.result);
          this.urls.push({
            id: Math.floor(1000 * Math.random() * 9000),
            src: event.target.result,
          });
          console.log(event);

          setTimeout(() => {
            this.ScrollNewLengh = this.imageContainer.nativeElement.scrollWidth;
          }, 0);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removeImage(event) {
    const b = this.urls.filter((e) => e === event);
    b.forEach((f) =>
      this.urls.splice(
        this.urls.findIndex((e) => e === f),
        1
      )
    );
    setTimeout(() => {
      this.ScrollNewLengh = this.imageContainer.nativeElement.scrollWidth;
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
  imgs: any[] = [
    {
      id: 1,
      src: '../../assets/img/first.jpg',
    },
    {
      id: 2,
      src: '../../assets/img/second.jpg',
    },
    {
      id: 3,
      src: '../../assets/img/fifth.jpg',
    },
    {
      id: 4,
      src: '../../assets/img/first.jpg',
    },
    {
      id: 5,
      src: '../../assets/img/second.jpg',
    },
    {
      id: 6,
      src: '../../assets/img/fifth.jpg',
    },
    {
      id: 7,
      src: '../../assets/img/first.jpg',
    },
    {
      id: 8,
      src: '../../assets/img/second.jpg',
    },
    {
      id: 9,
      src: '../../assets/img/fifth.jpg',
    },
  ];

  imageCount;

  openModal() {
    document.getElementById('myModal').style.display = 'block';
    this.imageCount = this.urls.length;
  }

  closeModal() {
    document.getElementById('myModal').style.display = 'none';
  }

  slideIndex = 1;

  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n) {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n) {
    let i;
    let slides = document.getElementsByClassName(
      'mySlides'
    ) as HTMLCollectionOf<HTMLElement>;
    let dots = document.getElementsByClassName('demo') as HTMLCollectionOf<
      HTMLElement
    >;
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[this.slideIndex - 1].style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
  }
}
