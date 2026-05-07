import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatService, Cat } from '../../services/cat';
import { BreedService, Breed } from '../../services/breed.service';

@Component({
  selector: 'app-cats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cats.component.html'
})
export class CatsComponent implements OnInit {
  cats: Cat[] = [];
  breeds: Breed[] = [];
  newCat = { name: '', age: 1, breed: null as number | null, hairiness: 'short' };
  editingId: number | null = null;
  editDraft: Partial<Cat> = {};

  constructor(
    private catService: CatService,
    private breedService: BreedService
  ) {}

  ngOnInit(): void {
    this.breedService.list().subscribe((b) => (this.breeds = b));
    this.loadCats();
  }

  loadCats(): void {
    this.catService.getCats().subscribe((data) => (this.cats = data));
  }

  addCat(): void {
    const payload = {
      ...this.newCat,
      breed: this.newCat.breed
    };
    this.catService.createCat(payload).subscribe(() => {
      this.newCat = { name: '', age: 1, breed: null, hairiness: 'short' };
      this.loadCats();
    });
  }

  deleteCat(id: number): void {
    this.catService.deleteCat(id).subscribe(() => this.loadCats());
  }

  startEdit(cat: Cat): void {
    this.editingId = cat.id;
    this.editDraft = {
      name: cat.name,
      age: cat.age,
      breed: cat.breed,
      hairiness: cat.hairiness
    };
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editDraft = {};
  }

  saveEdit(id: number): void {
    this.catService.updateCat(id, this.editDraft).subscribe(() => {
      this.cancelEdit();
      this.loadCats();
    });
  }

  breedName(breedId: number | null): string {
    if (breedId == null) {
      return '—';
    }
    return this.breeds.find((b) => b.id === breedId)?.name ?? `#${breedId}`;
  }
}
