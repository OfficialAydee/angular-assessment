const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const db = require("./db.json");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:4200",
  }),
);
app.use(express.json());

let companies = [...db.companies];
let vacancies = [...db.vacancies];

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Companies
app.get("/api/companies", (req, res) => {
  res.json(companies);
});

app.get("/api/companies/:id", (req, res) => {
  const company = companies.find((company) => company.id === req.params.id);

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  res.json(company);
});

app.post("/api/companies", (req, res) => {
  const {
    name,
    websiteUrl,
    street,
    houseNumber,
    houseNumberAddition,
    postalCode,
    city,
    country,
  } = req.body;

  if (!name || !street || !houseNumber || !postalCode || !city || !country) {
    return res.status(400).json({
      message: "Name and address fields are required",
    });
  }

  const company = {
    id: crypto.randomUUID(),
    name,
    websiteUrl: websiteUrl ?? "",
    street,
    houseNumber,
    houseNumberAddition: houseNumberAddition ?? "",
    postalCode,
    city,
    country,
  };

  companies.push(company);

  res.status(201).json(company);
});

app.put("/api/companies/:id", (req, res) => {
  const index = companies.findIndex((company) => company.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Company not found" });
  }

  companies[index] = {
    ...companies[index],
    ...req.body,
  };

  res.json(companies[index]);
});

app.delete("/api/companies/:id", (req, res) => {
  const exists = companies.some((company) => company.id === req.params.id);

  if (!exists) {
    return res.status(404).json({ message: "Company not found" });
  }

  companies = companies.filter((company) => company.id !== req.params.id);
  vacancies = vacancies.filter(
    (vacancy) => vacancy.companyId !== req.params.id,
  );

  res.status(204).send();
});

// Vacancies
app.get("/api/vacancies", (req, res) => {
  res.json(vacancies);
});

app.get("/api/vacancies/:id", (req, res) => {
  const vacancy = vacancies.find((vacancy) => vacancy.id === req.params.id);

  if (!vacancy) {
    return res.status(404).json({ message: "Vacancy not found" });
  }

  res.json(vacancy);
});

app.post("/api/vacancies", (req, res) => {
  const { companyId, title, description, isActive } = req.body;

  if (!companyId || !title) {
    return res.status(400).json({
      message: "Company and title are required",
    });
  }

  const companyExists = companies.some((company) => company.id === companyId);

  if (!companyExists) {
    return res.status(400).json({
      message: "Company does not exist",
    });
  }

  const vacancy = {
    id: crypto.randomUUID(),
    companyId,
    title,
    description: description ?? "",
    isActive: isActive ?? true,
  };

  vacancies.push(vacancy);

  res.status(201).json(vacancy);
});

app.put("/api/vacancies/:id", (req, res) => {
  const index = vacancies.findIndex((vacancy) => vacancy.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Vacancy not found" });
  }

  vacancies[index] = {
    ...vacancies[index],
    ...req.body,
  };

  res.json(vacancies[index]);
});

app.delete("/api/vacancies/:id", (req, res) => {
  const exists = vacancies.some((vacancy) => vacancy.id === req.params.id);

  if (!exists) {
    return res.status(404).json({ message: "Vacancy not found" });
  }

  vacancies = vacancies.filter((vacancy) => vacancy.id !== req.params.id);

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Mock API running on http://localhost:${port}`);
});
