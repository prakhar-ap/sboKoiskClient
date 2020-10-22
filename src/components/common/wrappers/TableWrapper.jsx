import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

// const useStyles = makeStyles({
//     table: {
//         minWidth: 650,
//     },
// });

function TableWrapper(props) {
    const {rows, headers, keys, title} = props;

    return (
        <div>
            {title &&
                <h1 className="title">{title}</h1>
            }
            <TableContainer component={Paper}>
                <Table className="table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headers.map(header => <TableCell key={header}>{header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row[keys.id]} className={"cell"}>
                                {
                                    keys.values.map((key) => (
                                        <TableCell key={row[key]}>{row[key]}</TableCell>
                                    ))
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

TableWrapper.propTypes = {
    rows: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    keys: PropTypes.object,
    title: PropTypes.string,
};

export default TableWrapper;
