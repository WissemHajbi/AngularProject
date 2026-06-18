# Mini Bike Rental Management App

A beginner-friendly **Angular + Express.js + SQLite** project for a school Framework Web subject.

## 1. Project idea

The application manages a small bike rental club:

- **Vélos / Bikes**: `id`, `marque`, `couleur`, `etat`
  - `etat = 0`: disponible / non emprunté
  - `etat = 1`: emprunté
- **Adhérents / Members**: personal information and `nbVeloencours`
- **Tours / Rentals**: links one bike to one adherent with `date_emp` and `date_retour`

The goal is not a complex professional app. The goal is a clean UI with very simple Angular and Express code that a beginner can explain.

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

Main backend files:

- `backend/database.js`: creates the SQLite database and tables
- `backend/server.js`: starts Express and connects route files
- `backend/routes/`: contains simple API route definitions
- `backend/controllers/`: receives requests and sends responses
- `backend/services/`: contains simple SQL queries and database logic
- `backend/package.json`: backend dependencies

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

### velos

```sql
id INTEGER PRIMARY KEY AUTOINCREMENT
marque TEXT
couleur TEXT
etat INTEGER
```

### adherents

```sql
id INTEGER PRIMARY KEY AUTOINCREMENT
nom TEXT
prenom TEXT
cin TEXT
email TEXT
tel TEXT
adresse TEXT
nbVeloencours INTEGER DEFAULT 0
```

### tours

```sql
id INTEGER PRIMARY KEY AUTOINCREMENT
veloId INTEGER
adherentId INTEGER
date_emp TEXT
date_retour TEXT
```

## 5. Main Angular patterns used

This project uses classic beginner Angular patterns:

- `AppModule` and `AppRoutingModule`
- model classes: `Velo`, `Adherent`, `Tour`
- services using `HttpClient`
- `subscribe()` to receive backend results
- `FormsModule` with `[(ngModel)]` for simple inputs
- `ReactiveFormsModule` with `FormGroup` in `AdherentCreateComponent`
- simple routes and `Router.navigate()` after adding data
- simple HTML tables with `*ngFor` and `*ngIf`

## 6. How this maps to exam patterns

The names are intentionally close to exam-style code:

- `chercherTousLesVelos()`
- `chercherVeloParId()`
- `getToursByIDAdherant()`
- `getAllTours()`
- `ajouterAdherent()`
- `ajouterAdherant()` in the component
- `Tour_Velo()`

The services use very direct methods like:

```ts
return this.http.get<Velo[]>(this.apiUrl);
```

The components call services and use `subscribe()`:

```ts
this.veloService.chercherTousLesVelos().subscribe(data => {
  this.velos = data;
});
```

## 7. Simple teacher presentation explanation

1. The backend is an Express server running on port `8080`.
2. The backend uses one SQLite file called `bike_rental.db`.
3. `database.js` creates three tables: `velos`, `adherents`, and `tours`.
4. Backend organization is simple: routes → controllers → services → database.
5. Angular runs on port `4200` and calls the backend using services.
6. A bike can be available (`etat = 0`) or borrowed (`etat = 1`).
7. When the user clicks **Faire un tour**, Angular calls `/api/tours/faire-tour`.
8. The backend checks if the bike is available, creates a tour, changes the bike state to borrowed, and increments the adherent counter.
9. When the user clicks **Retourner**, the backend sets the return date, makes the bike available again, and decrements the counter.
10. The dashboard shows simple charts using `ng2-charts` and `chart.js`.

## Useful API endpoints

### Vélos

- `GET /api/velos`
- `GET /api/velos/disponibles`
- `GET /api/velos/:id`
- `POST /api/velos`
- `PUT /api/velos/:id`
- `DELETE /api/velos/:id`

### Adhérents

- `GET /api/adherents`
- `GET /api/adherents/:id`
- `POST /api/adherents`
- `PUT /api/adherents/:id`
- `DELETE /api/adherents/:id`

### Tours

- `GET /api/tours`
- `GET /api/tours/adherent/:adherentId`
- `POST /api/tours/faire-tour`
- `PUT /api/tours/:id/retourner`
