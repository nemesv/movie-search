import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useRouteMatch } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";


export function MovieSearchResult({ rows, limit = 10 }) {
  let { url } = useRouteMatch();
  return (
    <Container>
      <Typography variant="h7">Results:</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(0, limit).map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Link to={`${url}/${row.id}`}>{row.name}</Link>
                </TableCell>
                <TableCell>{new Date(row.releaseDate).getFullYear()}</TableCell>
                <TableCell>
                  {row.genres.map((g) => g.name).join(", ")}
                </TableCell>
                <TableCell>{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
