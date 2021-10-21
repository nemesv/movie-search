import { useState } from "react";
import Button from "@mui/material/Button";


export function SearchForm({ onSearch, label }) {
  const [value, setValue] = useState("");
  return (
    <div>
      <label htmlFor="search">{label}</label>
      <input
        name="search"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter")
            onSearch(value);
        }}
        value={value} />
      <Button onClick={() => onSearch(value)}>Search</Button>
    </div>
  );
}
