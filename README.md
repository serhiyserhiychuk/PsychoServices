# Project Name

CampersForRent

## Description

This project is a React application that allows filtering and displaying a list of campers using a filter form.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/serhiyserhiychuk/campersforrent.git
   ```
2. Navigate to the project directory:
   ```sh
   cd campersforrent
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the application:
   ```sh
   npm run dev
   ```
2. Open your browser and go to link from the terminal to view the app.

## Code Example

```jsx
import React, { useState, useEffect } from "react";
import FilterForm from "./components/FilterForm";
import CamperList from "./components/CamperList";
import Loader from "./components/Loader";
import css from "./App.module.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [campersToRender, setCampersToRender] = useState([]);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    // Fetch data from API
    // Set campersToRender and isLoading state
  }, []);

  const onSubmit = (filters) => {
    setFilters(filters);
    // Apply filters to campersToRender
  };

  return (
    <div className={css.div}>
      <FilterForm onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {filters &&
        (campersToRender.length > 0 ? (
          <CamperList campers={campersToRender} filters={filters} />
        ) : (
          <p>No favorites</p>
        ))}
    </div>
  );
};

export default App;
```
