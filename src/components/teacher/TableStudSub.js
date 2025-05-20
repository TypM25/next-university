import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loading from '../loadingMui';


export default function TableStudSub({ student }) {
    return (
        <>
            {
                Array.isArray(student) && student.length > 0 ? (
                    <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Student ID</TableCell>
                                    <TableCell align="center">First Name</TableCell>
                                    <TableCell align="center">Last Name</TableCell>
                                    <TableCell align="center">Grade</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {student.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        <TableCell align="center">{row.student_id}</TableCell>
                                        <TableCell align="center">{row.student_first_name}</TableCell>
                                        <TableCell align="center">{row.student_last_name}</TableCell>
                                        <TableCell align="center">
                                            {row?.gradeDetails && row.gradeDetails.length > 0 ?
                                                row.gradeDetails[0].grade
                                                : "-"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Loading />
                )
            }
        </>
    );
}