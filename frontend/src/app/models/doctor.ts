// A model class describes the shape of a doctor object used in Angular.
export class Doctor {
  id!: number;
  firstName!: string;
  lastName!: string;
  specialty!: string;
  email!: string;
  phone!: string;
  available!: number;
}
