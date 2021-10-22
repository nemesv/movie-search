import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export function SearchForm({ onSearch, label, defaultValue = "" }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <Container>
      <Box sx={{ display: "flex", m: 2, justifyContent: "center" }}>
        <TextField
          label={label}
          name="search"
          variant="outlined"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") onSearch(value);
          }}
          value={value}
        />
        <Button onClick={() => onSearch(value)}>Search</Button>
      </Box>
    </Container>
  );
}
