import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

class MainTable extends React.Component {
    render() {
        const planets = this.props.planets;
        const headStyle = {
            fontSize: 16,
            fontWeight: "bold"
        };
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                        <TableRow sx={{ backgroundColor: "#fcdac5" }}>
                            <TableCell style={headStyle}>Planet Name</TableCell>
                            <TableCell style={headStyle} align="right">Population</TableCell>
                            <TableCell style={headStyle} align="right">Rotation Period</TableCell>
                            <TableCell style={headStyle} align="right">Orbital Period</TableCell>
                            <TableCell style={headStyle} align="right">Diameter</TableCell>
                            <TableCell style={headStyle} align="right">Climate</TableCell>
                            <TableCell style={headStyle} align="right">Surface Water</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {planets.map((planet) => (
                            <TableRow
                                key={planet.name}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:nth-of-type(even)': { backgroundColor: "#fff0d4" }
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {planet.name}
                                </TableCell>
                                <TableCell align="right">{planet.population}</TableCell>
                                <TableCell align="right">{planet.rotation_period}</TableCell>
                                <TableCell align="right">{planet.orbital_period}</TableCell>
                                <TableCell align="right">{planet.diameter}</TableCell>
                                <TableCell align="right">{planet.climate}</TableCell>
                                <TableCell align="right">{planet.surface_water}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default MainTable;