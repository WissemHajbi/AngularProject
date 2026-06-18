// A model class describes the shape of a patient object.
export class Patient {
  id!: number;
  firstName!: string;
  lastName!: string;
  cin!: string;
  email!: string;
  phone!: string;
  address!: string;
  appointmentsCount!: number;
}
