import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import {TableContainer} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

function TableWrapper(props) {
    const {rows, headers, keys, onClick, selection} = props;

    return (
        <div>
            <div className={'summary'}>
                {rows.length} result(s) found for {selection}
            </div>
            <TableContainer component={Paper}>
                {rows.length === 0 ?
                    (
                        <Grid className={'noData'}>
                            No data to display!
                        </Grid>
                    ) : (
                <Table className="table" aria-label="simple table">
                    <TableHead>
                        <TableRow aria-disabled={true}>
                            {headers.map(header => <TableCell key={header}>{header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row[keys.id]} className={"cell"} onClick={() => onClick(row)}>
                                {
                                    keys.values.map((key) => (
                                        <TableCell key={row[key]}>{row[key]}</TableCell>
                                    ))
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                    )}
            </TableContainer>
        </div>
    );
}

TableWrapper.propTypes = {
    rows: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    keys: PropTypes.object,
    title: PropTypes.string,
    onClick: PropTypes.func,
    selection: PropTypes.string
};

export default TableWrapper;
