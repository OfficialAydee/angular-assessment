# JEX Front-end Assessment

Hi! 👋

Mijn naam is Akash Datadin, een Front-end Developer uit Den Haag met een sterke focus op Angular, UX/UI en het bouwen van schaalbare webapplicaties.

## About me

Sinds 2017 werk ik professioneel aan softwareprojecten, variërend van interne bedrijfsplatformen en overheidsoplossingen tot SaaS-producten, mobiele applicaties en e-commerce platformen. Dit deed ik naast mijn school. Al mijn vrije tijd en vakanties gingen naar bouwen van leuke projecten! In juli 2024 ben ik afgestudeerd als HBO-ICT Software Engineer aan De Haagse Hogeschool. Momenteel werk ik als Medior Front-end Developer, waar ik verantwoordelijk ben voor het moderniseren van bestaande software naar moderne webapplicaties met Angular. Daarnaast ontwikkel ik in mijn vrije tijd eigen producten, waaronder SaaS-platformen en mobiele applicaties.

---

## Assessment informatie

Voor dit assessment heb ik een oplossing gebouwd op basis van Angular 21 en een kleine Node.js/Express mock API. De mock API zelf is gegenereerd o.b.v. de opdracht door AI. Dit om het proces te versnellen en de data te kunnen laten tonen in de Front-end. De focus lag hierbij niet op uitgebreide styling of backend-complexiteit, maar op een duidelijke architectuur, onderhoudbare code en een prettige gebruikerservaring. De applicatie ondersteunt het beheren van bedrijven en vacatures, het aanmaken van nieuwe vacatures en het tonen van actieve vacatures aan publieke gebruikers, conform de gestelde requirements van JEX.

---

## Inhoudsopgave

- [Technische keuzes](#technische-keuzes)

- [Architectuur](#architectuur)

- [Installatie & opstarten](#installatie--opstarten)

- [Functionaliteiten](#functionaliteiten)

- [Tijdsbesteding](#tijdsbesteding)

- [AI gebruik](#ai-gebruik)

---

## Technische keuzes

### Front-end

- Angular 21
- Standalone Components
- Reactive Forms
- Angular Router
- TypeScript
- SCSS

### Back-end

- Node.js
- Express
- REST API
- In-memory data opslag (mock backend)

## Architectuur

De applicatie is bewust opgesplitst in een front-end en een mock backend om een realistische client-server architectuur te simuleren.

```text
assessment/
├── frontend/
│   └── Angular applicatie
│
├── mock-api/
│   └── Express API
│
└── docs/
    └── Assessment documentatie
```

Hierdoor kan de Angular applicatie eenvoudig gekoppeld worden aan een echte backend zonder wijzigingen aan de componenten of gebruikersinterface.

## Installatie & opstarten

Om de applicatie lokaal te draaien dienen zowel de Angular front-end als de mock API gestart te worden.

### 1. Clone de repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Start de mock API

Open een terminal en navigeer naar de `mock-api` map.

```bash
cd mock-api
npm install
npm run dev
```

De mock API draait vervolgens op:

```text
http://localhost:3000/api
```

### 3. Start de Angular applicatie

Open een tweede terminal en navigeer naar de `frontend` map.

```bash
cd frontend
npm install
ng serve
```

De Angular applicatie is vervolgens bereikbaar via:

```text
http://localhost:4200
```

### 4. Beschikbare pagina's

| Route             | Omschrijving                            |
| ----------------- | --------------------------------------- |
| `/companies`      | Beheer van bedrijven                    |
| `/vacancies`      | Beheer van vacatures                    |
| `/create-vacancy` | Aanmaken van een nieuwe vacature        |
| `/jobs`           | Publiek overzicht van actieve vacatures |

### Opmerking

De mock API maakt gebruik van in-memory opslag. Wijzigingen blijven actief zolang de server draait en worden teruggezet naar de initiële dataset na een herstart van de API.

## Tijdsbesteding

Totale tijd besteed aan deze opdracht: **[X uur]**

- Dinsdag 23 juni 2026: 19.40 - 21.15

## AI gebruik

Er is AI gebruikt voor aspecten die buiten de scope viel of het proces makkelijker maakte. Dit zijn de volgende punten:

- README.md
- db.json
- server.js

## Bedankt

Bedankt voor het bekijken van mijn uitwerking. Mocht je vragen hebben over gemaakte keuzes, architectuur of mogelijke uitbreidingen, dan licht ik deze graag verder toe.

Met vriendelijke groet,

**Akash Datadin**
Front-end Developer
