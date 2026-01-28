import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeService } from '../../core/poke.service';

@Component({
    selector: 'app-pokemon-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="pokedex-container">
      <h2>POKEDEX</h2>
      <div class="grid">
        <div class="pk-card pokemon-card" *ngFor="let p of pokemons">
          <div class="img-container">
            <img [src]="p.image" [alt]="p.name">
          </div>
          <div class="info">
            <span class="number">#{{ p.id }}</span>
            <p class="name">{{ p.name | uppercase }}</p>
            <div class="types">
              <span class="type" *ngFor="let t of p.types" [class]="t.type.name">{{ t.type.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button class="pk-btn" (click)="loadMore()">LOAD MORE</button>
      </div>
    </div>
  `,
    styles: [`
    .pokedex-container { padding: 20px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 20px;
    }
    .pokemon-card {
      text-align: center;
      background: white;
      transition: transform 0.2s;
    }
    .pokemon-card:hover {
      transform: translateY(-5px);
    }
    .img-container {
      background: #f0f0f0;
      padding: 10px;
      border-bottom: 2px solid var(--pk-blue);
    }
    .info { padding: 10px; }
    .number {
      font-size: 10px;
      color: #999;
      font-family: 'Press Start 2P';
    }
    .name {
      margin: 5px 0;
      font-weight: bold;
      font-family: 'Press Start 2P';
      font-size: 10px;
    }
    .types {
      display: flex;
      justify-content: center;
      gap: 5px;
      margin-top: 5px;
    }
    .type {
      font-size: 9px;
      padding: 2px 5px;
      border-radius: 4px;
      color: white;
      text-transform: uppercase;
    }
    .type.grass { background-color: #78C850; }
    .type.fire { background-color: #F08030; }
    .type.water { background-color: #6890F0; }
    .type.poison { background-color: #A040A0; }
    .type.flying { background-color: #A890F0; }
    .type.bug { background-color: #A8B820; }
    .type.normal { background-color: #A8A878; }
    /* Add more types as needed */
    
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  `]
})
export class PokemonListComponent implements OnInit {
    pokemons: any[] = [];
    offset = 0;
    limit = 20;

    constructor(private pokeService: PokeService) { }

    ngOnInit() {
        this.loadPokemons();
    }

    loadPokemons() {
        this.pokeService.getPokemonList(this.limit, this.offset).subscribe((res: any) => {
            res.results.forEach((p: any) => {
                this.pokeService.getPokemonDetails(p.name).subscribe((details: any) => {
                    this.pokemons.push({
                        id: details.id,
                        name: details.name,
                        image: details.sprites.front_default,
                        types: details.types
                    });
                    this.pokemons.sort((a, b) => a.id - b.id); // Valid sort but naive for async calls
                });
            });
            this.offset += this.limit;
        });
    }

    loadMore() {
        this.loadPokemons();
    }
}
