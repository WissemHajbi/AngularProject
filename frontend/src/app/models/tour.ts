// A model class describes one bike tour/rental.
// It uses veloId and adherentId to link a bike with a member.
export class Tour {
  id!: number;
  veloId!: number;
  adherentId!: number;
  date_emp!: string;
  date_retour!: string;
}
