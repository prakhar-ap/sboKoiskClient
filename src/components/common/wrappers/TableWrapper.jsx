import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TablePagination from "@material-ui/core/TablePagination";

const lightTheme = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    emptyList: {
        color: 'var(--milled-wine)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        minHeight: '344px',
    },
    paper: {
        width: '100%',
        minWidth: 750,
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
        '& th': {
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: 'var(--black-pearl)',
            borderBottom: '0.4px light grey',
        },
        '& tbody': {
            '& tr': {
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#e9e9e9',
                },
                '&:nth-child(even)': {
                    backgroundColor: 'var(--ghost-white)',
                }
            },
        },
    }
}));

const darkTheme = makeStyles((theme) => ({
    root: {
        width: '100%',
        color: 'white',
    },
    emptyList: {
        color: 'whitesmoke',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        minHeight: '344px',
        backgroundColor: '#333'
    },
    paper: {
        backgroundColor: '#333',
        minWidth: 750,
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
        '& th': {
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: 'whitesmoke',
            borderBottom: '1px groove #787777',
        },
        '& tbody': {
            '& tr': {
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#525151',
                },
                '&:nth-child(even)': {
                    backgroundColor: '#3d3d3d',
                },
            },
        },
    }
}));

function TableWrapper(props) {
    const {rows, headers, keys, onClick, selection, theme} = props;
    const classes = !theme ? lightTheme() : darkTheme();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className={classes.root}>
            <div className={'summary'}>
                {rows.length} result(s) found for {selection}
            </div>
            {!rows?.length ? (
                <Paper className={classes.emptyList}>
                    <div>No data to display!</div>
                </Paper>
                ) : (
                <Paper className={classes.paper} elevation={8}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow aria-disabled={true}>
                                {headers.map(header =>
                                    <TableCell
                                        align={"center"}
                                        key={header}>
                                        {header}
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                <TableRow key={row[keys.id]} className={"cell"} onClick={() => onClick(row)}>
                                    {
                                        keys.values.map((key) => (
                                            <TableCell
                                                align={"center"}
                                                key={row[key]}
                                                style={{
                                                    color: !theme ? 'var(--black-pearl)': 'whitesmoke',
                                                    border: '0.1px',
                                                }}>
                                                {row[key]}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        style={{color: !theme ? '#7a7878': 'whitesmoke'}}
                    />
                </Paper>
            )}
        </div>
    );
}

TableWrapper.propTypes = {
    rows: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    keys: PropTypes.object,
    title: PropTypes.string,
    onClick: PropTypes.func,
    selection: PropTypes.string,
    theme: PropTypes.bool,
};

export default TableWrapper;
