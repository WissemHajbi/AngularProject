// A model class describes the shape of a bike object used in Angular.
// It has the same fields as the velos table in SQLite.
export class Velo {
  id!: number;
  marque!: string;
  couleur!: string;
  etat!: number;
}
