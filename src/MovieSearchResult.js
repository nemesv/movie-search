import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export function MovieSearchResult({ rows, limit = 10 }) {
  return <div style={{ maxWidth: 650 }}>
    <h1>Results:</h1>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(limit).map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {row.name}
              </TableCell>
              <TableCell>
                {new Date(row.releaseDate).getFullYear()}
              </TableCell>
              <TableCell>
                {row.genres.map((g) => g.name).join(", ")}
              </TableCell>
              <TableCell>{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>;
}
