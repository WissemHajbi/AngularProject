# Mini Clinic Appointment Management App

A beginner-friendly **Angular + Express.js + SQLite** project for a school Framework Web subject.

## 1. Project idea

The application manages a small clinic:

- **Doctors**: `id`, `firstName`, `lastName`, `specialty`, `email`, `phone`, `available`
  - `available = 1`: available
  - `available = 0`: busy
- **Patients**: `id`, `firstName`, `lastName`, `cin`, `email`, `phone`, `address`, `appointmentsCount`
- **Appointments**: `id`, `doctorId`, `patientId`, `appointmentDate`, `endDate`

When an appointment is booked, the doctor becomes busy and the patient appointment count increases. When the appointment is completed, the doctor becomes available again and the patient's current appointment count decreases.

## 2. Backend setup commands

```bash
cd backend
npm install
node server.js
```

Backend URL:

```text
http://localhost:8080/api
```

Backend organization:

```text
backend/
  server.js
  database.js
  routes/
  controllers/
  services/
```

Simple flow:

```text
routes -> controllers -> services -> SQLite database
```

## 3. Frontend setup commands

```bash
cd frontend
npm install
ng serve
```

Frontend URL:

```text
http://localhost:4200
```

## 4. Database tables

### doctors

```sql
id INTEGER PRIMARY KEY AUTOINCREMENT
firstName TEXT
lastName TEXT
specialty TEXT
email TEXT
phone TEXT
available INTEGER
```

### patients

```sql
id INTEGER PRIMARY KEY AUTOINCREMENT
firstName TEXT
lastName TEXT
cin TEXT
email TEXT
phone TEXT
address TEXT
appointmentsCount INTEGER DEFAULT 0
```

### appointments

```sql
id INTEGER PRIMARY KEY AUTOINCREMENT
doctorId INTEGER
patientId INTEGER
appointmentDate TEXT
endDate TEXT
```

## 5. Main Angular patterns used

- Traditional `AppModule`
- `AppRoutingModule`
- Model classes: `Doctor`, `Patient`, `Appointment`
- Services using `HttpClient`
- `subscribe()` to receive backend data
- `FormsModule` with `[(ngModel)]`
- `ReactiveFormsModule` with `FormGroup` in `PatientCreateComponent`
- Simple HTML tables with `*ngFor`
- Simple conditions with `*ngIf`
- `Router.navigate()` after creating data

## 6. API endpoints

### Doctors

- `GET /api/doctors`
- `GET /api/doctors/available`
- `GET /api/doctors/:id`
- `POST /api/doctors`
- `PUT /api/doctors/:id`
- `DELETE /api/doctors/:id`

### Patients

- `GET /api/patients`
- `GET /api/patients/:id`
- `POST /api/patients`
- `PUT /api/patients/:id`
- `DELETE /api/patients/:id`

### Appointments

- `GET /api/appointments`
- `GET /api/appointments/patient/:patientId`
- `POST /api/appointments/book`
- `PUT /api/appointments/:id/complete`

## 7. Match with exam requirements

This project now matches the class requirements:

- **Angular modular architecture**: components, services, models, routing module, app module.
- **REST API communication**: Angular services consume the Express API using `HttpClient`.
- **CRUD module**: Doctors have Create, Read, Update, and Delete in the frontend and backend.
- **Relation between two tables**: Appointments connect Doctors and Patients using `doctorId` and `patientId`; the appointment page displays doctor and patient names.
- **Angular forms**: Patient creation uses `FormGroup`; Doctor forms use simple `ngModel`.
- **Users and roles**: simple login with `admin` and `user` roles.
- **Access control**: routes are protected with `AuthGuard`; admin-only buttons are hidden for normal users.
- **Dashboard**: charts show doctor availability and appointments by patient.
- **Deployment/build**: frontend can be built using `ng build`.

Login accounts:

```text
Admin: admin / admin123
User:  user / user123
```

Build frontend for deployment:

```bash
cd frontend
npm run build
```

## 8. Simple teacher presentation explanation

1. The backend is an Express server running on port `8080`.
2. The backend uses one SQLite file called `clinic.db`.
3. `database.js` creates three tables: `doctors`, `patients`, and `appointments`.
4. The backend is organized as routes, controllers, and services.
5. Angular runs on port `4200` and calls the backend using services.
6. A doctor can be available (`available = 1`) or busy (`available = 0`).
7. When the user clicks **Book**, Angular calls `/api/appointments/book`.
8. The backend checks if the doctor is available, creates an appointment, changes the doctor to busy, and increments the patient's appointment count.
9. When the user clicks **Complete**, the backend sets the end date, makes the doctor available again, and decrements the patient's current appointment count.
10. The dashboard shows simple charts using `ng2-charts` and `chart.js`.
