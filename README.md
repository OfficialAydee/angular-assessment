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
- [Testcases](#testcases)
- [Tijdsbesteding](#tijdsbesteding)
- [AI gebruik](#ai-gebruik)

---

## Technische keuzes

### Front-end

- Angular 22
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

| Route                                                        | Omschrijving                                          |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| `/jobs`                                                      | Publiek overzicht van bedrijven met actieve vacatures |
| `/jobs/:companyId/vacancies/create`                          | Nieuwe vacature aanmaken als webgebruiker             |
| `/jobs/:companyId/vacancies/:vacancyId`                      | Publieke detailpagina van een vacature                |
| `/jobs/:companyId/vacancies/:vacancyId/edit`                 | Publieke vacature bewerken                            |
| `/backoffice/companies`                                      | Overzicht van alle bedrijven                          |
| `/backoffice/companies/create`                               | Nieuw bedrijf aanmaken                                |
| `/backoffice/companies/:companyId`                           | Detailpagina van een bedrijf                          |
| `/backoffice/companies/:companyId/edit`                      | Bedrijf bewerken                                      |
| `/backoffice/companies/:companyId/vacancies/create`          | Nieuwe vacature aanmaken voor een bedrijf             |
| `/backoffice/companies/:companyId/vacancies/:vacancyId`      | Detailpagina van een vacature                         |
| `/backoffice/companies/:companyId/vacancies/:vacancyId/edit` | Vacature bewerken                                     |

### Opmerking

De mock API maakt gebruik van in-memory opslag. Wijzigingen blijven actief zolang de server draait en worden teruggezet naar de initiële dataset na een herstart van de API.

## Testcases

### User Story 1: Als backoffice medewerker wil ik bedrijven en vacatures beheren

1. Ga naar `http://localhost:4200`.
2. Klik in de sidebar op **Companies**.
3. Controleer of de bedrijven als kaarten worden getoond.
4. Klik op **Nieuw bedrijf** / **Create company**.
5. Vul minimaal de verplichte bedrijfsgegevens in.
6. Klik op **Opslaan**.
7. Controleer of het nieuwe bedrijf zichtbaar is in het overzicht.
8. Klik op het bedrijf.
9. Klik op **Bewerken** en wijzig de gegevens.
10. Klik op **Opslaan** en controleer of de wijziging zichtbaar is.
11. Klik op **Nieuwe vacature**.
12. Vul minimaal **titel** en **omschrijving** in.
13. Klik op **Opslaan**.
14. Controleer of de vacature zichtbaar is bij het bedrijf.
15. Klik op de vacature.
16. Klik op **Bewerken**, wijzig de vacature en sla op.
17. Klik op **Verwijderen**.
18. Bevestig de delete-dialog.
19. Controleer of de vacature verwijderd is.
20. Verwijder eventueel ook het bedrijf via de delete-dialog.

---

### User Story 2: Als web-gebruiker wil ik bedrijven met bijbehorende vacatures zien

1. Ga naar `http://localhost:4200/jobs`.
2. Controleer of bedrijven worden getoond met daaronder hun actieve vacatures.
3. Controleer dat bedrijven zonder actieve vacatures niet zichtbaar zijn.
4. Controleer dat inactieve vacatures niet zichtbaar zijn op de publieke pagina.
5. Klik op een vacature.
6. Controleer of de vacaturedetailpagina opent.
7. Controleer of titel, omschrijving, locatie, salaris en bedrijfsinformatie zichtbaar zijn.
8. Klik op **Terug naar vacatures**.
9. Controleer of je terugkomt op het vacatureoverzicht.

---

### User Story 3: Als web-gebruiker wil ik een vacature kunnen aanmaken voor een bedrijf

1. Ga naar `http://localhost:4200/jobs`.
2. Klik bij het toegestane bedrijf op **Vacature plaatsen**.
3. Controleer of het formulier opent.
4. Klik op **Vacature plaatsen** zonder titel in te vullen.
5. Controleer of de validatiemelding **Titel is verplicht** zichtbaar is.
6. Vul minimaal een titel in.
7. Vul eventueel locatie, salaris en omschrijving in.
8. Klik op **Vacature plaatsen**.
9. Controleer of je teruggaat naar het vacatureoverzicht.
10. Controleer of de nieuwe vacature zichtbaar is onder het bedrijf.
11. Klik op de aangemaakte vacature.
12. Klik op **Vacature bewerken**.
13. Wijzig de titel of omschrijving.
14. Klik op **Wijzigingen opslaan**.
15. Controleer of de gewijzigde vacature zichtbaar is op de detailpagina.

## Tijdsbesteding

Totale tijd (grof) besteed aan deze opdracht: **[6 uur en 31 minuten]**

- Dinsdag 23 juni 2026: 19.40 - 21.00
- Woensdag 24 juni 2026: 20.17- 21.00
- Donderdag 25 juni 2026: 18.28 - 21.02 & 22.30 - 22.34
- Zaterdag 27 juni 2026: 13.50 - 15.40

## AI gebruik

Er is AI gebruikt voor aspecten die buiten de scope viel of het proces makkelijker maakte. Dit zijn de volgende punten:

- README.md
- db.json
- server.js
- auth.ts

Verder kleine stukken code die ik zelf op heb gezet en met AI heb versimpeld/refactored zoals `export type VacancyFormData = Omit<VacancyModel, 'id' | 'companyId'>;` in vacancy-form.ts

## Bedankt

Bedankt voor het bekijken van mijn uitwerking. Mocht je vragen hebben over gemaakte keuzes, architectuur of mogelijke uitbreidingen, dan licht ik deze graag verder toe.

Met vriendelijke groet,

**Akash Datadin**
Front-end Developer
