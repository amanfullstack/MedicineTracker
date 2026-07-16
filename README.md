# ABC Pharmacy Medicine Tracker App

This workspace contains two apps:

- `api` - ASP.NET Core Web API with Swagger and JSON-file storage
- `client` - React SPA for viewing, adding, and selling medicines

![1784218072481](image/README/1784218072481.png)

## API

```bash
cd api
dotnet run
```

Swagger is available at `http://localhost:5029/swagger` when running in development.

The API stores data in `api/Data/medicines.json`.

## Client

![1784218009783](image/README/1784218009783.png)

```bash
cd client
npm install
npm run dev
```

The client talks to the API at `http://localhost:5029/api` by default.

## Lib : 
Ag grid for grid

## Requirement

Functional Requirements:
Display the list of medicines available in System
- The results showing the medicine attributes (except Notes) should be displayed
in a grid.
- There should be color indications which follow the guidelines mentioned below:
- Red background for medicines with expiry date less than 30 days
- Yellow background for medicines with quantity in stock less than 10
- Page should have search capability which can query on name of medicine
attribute. [Good to have]

## Features

- Medicine list grid without the Notes column
- Red row styling for medicines expiring in less than 30 days
- Yellow row styling for medicines with stock below 10
- Search by medicine name
- Add medicine form
- Sale record form
- Sale history grid
