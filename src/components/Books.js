import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getSession } from '../helpers/sessionHelper';
import ButtonAppBar from './custom/AppBar';
import {
    makeStyles,
    withStyles,
    useTheme,
    createStyles
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
const axios = require('axios');

const useStylesBooks = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },

    customPaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    customTypographySignUp: {
        padding: theme.spacing(2),
    },

    customTypography: {
        padding: theme.spacing(1),
    },

    table: {
        width: '100%'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const useStylesTablePagination = makeStyles((theme) =>
    createStyles({
        root: {
            flexShrink: 0
        },
    }),
);

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    }
}))(TableRow);

function TablePaginationActions(props) {
    const classes = useStylesTablePagination();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event,
            Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ?
                    <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page">
                {theme.direction === 'rtl' ?
                    <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ?
                    <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ?
                    <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const Books = (props) => {
    const [apiResult, setApiResult] = useState([])

    useEffect(() => {
        displayBooks();
    }, [])

    const displayBooks = async () => {
        try {
            let result = await axios.get('http://localhost:3000/api/book', {
                headers: {
                    Authorization: getSession('token')
                }
            })
            if (result.data) {
                setApiResult(result.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const classes = useStylesBooks();



    const fabs = {
        color: 'primary',
        className: classes.fab,
        icon: <AddIcon />,
        label: 'Add',
    }



    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage,
        apiResult.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <ButtonAppBar name='Book List'
                signInOut='Sign Out'>
                <Grid item xs={12}>
                    <Paper className={classes.customPaper}>
                        <Typography variant="h4"
                            className={classes.customTypographySignUp}>
                            Books List
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table}
                                aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>ISBN</StyledTableCell>
                                        <StyledTableCell>Title</StyledTableCell>
                                        <StyledTableCell>Author</StyledTableCell>
                                        <StyledTableCell>Publisher</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {apiResult && (rowsPerPage > 0
                                        ? apiResult.slice(page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage)
                                        : apiResult
                                    ).map(item => (
                                        < StyledTableRow key={item._id} >
                                            <StyledTableCell component="th" scope="row">
                                                {item.isbn}
                                            </StyledTableCell>
                                            <StyledTableCell>{item.title}</StyledTableCell>
                                            <StyledTableCell>{item.author}</StyledTableCell>
                                            <StyledTableCell>{item.publisher}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter className="testingStyle">

                                    <TableRow><TablePagination
                                        rowsPerPageOptions={[5, 10, 25,
                                            { label: 'All', value: -1 }]}
                                        colSpan={4}
                                        count={apiResult.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    /></TableRow>

                                </TableFooter>
                            </Table>
                        </TableContainer>
                        <Fab aria-label={fabs.label}
                            className={fabs.className}
                            color={fabs.color}
                            href='/books/create'>
                            {fabs.icon}
                        </Fab>
                    </Paper>
                </Grid>
            </ButtonAppBar>
        </div >
    )
}

const mapStateToProps = state => ({
    username: state.login.username
})

export default connect(mapStateToProps)(Books)