# UK Energy Carbon Intensity Dashboard

This projectprovide data on the carbon intensity of the UK's national grid. It fetches data from the National Grid ESO API to display the current fuel mix for energy generation and calculates the optimal time window to charge.

visit the website: https://codibly-uk-energy-zadanie-rekrutacyjne.onrender.com/

## Technologies Used

### Frontend

-   **Framework:** React
-   **Build Tool:** Vite
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **UI Components:** shadcn/ui
-   **Charting Library:** Recharts

### Backend

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Language:** TypeScript

---

## Getting Started

### Prerequisites

-   Node.js and npm installed on your machine.

### Setup and Running

1.  **Clone the repository**

## Running with Docker

### Build the Image

Build the Docker image.

```bash
docker build -t uk-energy-app .
```

### Run the Container

Once the image is built, run the following command to start the container.

```bash
docker run -d -p 8080:8080 uk-energy-app

```

This will run on your local machine on port 8080 inside the container.
http://localhost:8080