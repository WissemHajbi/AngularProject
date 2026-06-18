// A model class describes the shape of an adherent/member object.
// The exclamation mark means the value will be assigned later.
export class Adherent {
  id!: number;
  nom!: string;
  prenom!: string;
  cin!: string;
  email!: string;
  tel!: string;
  adresse!: string;
  nbVeloencours!: number;
}
