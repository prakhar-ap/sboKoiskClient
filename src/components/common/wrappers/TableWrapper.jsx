import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';

// const useStyles = makeStyles({
//     table: {
//         minWidth: 650,
//     },
// });

function TableWrapper(props) {
    const {rows, headers, keys, title, onClick} = props;

    return (
        <div>
            {title &&
                <h1 className="title">{title}</h1>
            }
            <Table className="table" aria-label="simple table">
                <TableHead>
                    <TableRow aria-disabled={true}>
                        {headers.map(header => <TableCell key={header}>{header}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row[keys.id]} className={"cell"} onClick={onClick}>
                            {
                                keys.values.map((key) => (
                                    <TableCell key={row[key]}>{row[key]}</TableCell>
                                ))
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

TableWrapper.propTypes = {
    rows: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    keys: PropTypes.object,
    title: PropTypes.string,
    onClick: PropTypes.func
};

export default TableWrapper;
