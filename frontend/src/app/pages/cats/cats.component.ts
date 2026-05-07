import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatService, Cat } from '../../services/cat';

@Component({
  selector: 'app-cats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cats.component.html'
})
export class CatsComponent implements OnInit {
  cats: Cat[] = [];
  newCat = { name: '', age: 1, breed: null as number | null, hairiness: 'short' };

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.loadCats();
  }

  loadCats(): void {
    this.catService.getCats().subscribe(data => this.cats = data);
  }

  addCat(): void {
    this.catService.createCat(this.newCat).subscribe(() => {
      this.newCat = { name: '', age: 1, breed: null, hairiness: 'short' };
      this.loadCats();
    });
  }

  deleteCat(id: number): void {
    this.catService.deleteCat(id).subscribe(() => this.loadCats());
  }
}