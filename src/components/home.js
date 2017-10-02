import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firebaseConnect, isEmpty, isLoaded} from 'react-redux-firebase'
import {PLAYER_LOCATION, TRAINING_LOCATION} from "./constants/api.constants";
import {IconButton, Paper, Table, Toolbar, Tooltip, Typography} from "material-ui";
import {
    TableBody, TableCell, TableFooter, TableHead, TablePagination,
    TableRow, TableSortLabel
} from "../../node_modules/material-ui/Table/index";
import {Checkbox} from "../../node_modules/material-ui/index";
import {withStyles} from 'material-ui/styles';
import {LoadingSpinner} from "./loading.spinner";

class HomePresentation extends Component {
    state = {
        players: []
    };

    calculatePercentages = (trainings) => {
        const trainingsMap = new Map();
        const trainingsForSeason = Object.keys(trainings)
            .filter(key => trainings[key].season === '-Kv2ykMiCcOvSV2fmPD2')
            .map(key => {
                const training = trainings[key];
                training.key = key;

                return training
            });
        trainingsForSeason.forEach(training => {
            if (training.players) {
                Object.keys(training.players).forEach(key => {
                    const playerKey = training.players[key];
                    if (trainingsMap.has(playerKey)) {
                        trainingsMap.set(playerKey, trainingsMap.get(playerKey) + 1)
                    } else {
                        trainingsMap.set(playerKey, 1)
                    }
                })
            }
        });
        let arrayToSort = Array.from(trainingsMap);
        arrayToSort.sort((x, y) => {
            return x - y
        });

        this.setState({players: arrayToSort})
    };

    componentWillReceiveProps(nextProps) {
        const {players, trainings} = nextProps;
        if ((!isEmpty(players) && isLoaded(players)) && (!isEmpty(trainings) && isLoaded(trainings))) {
            this.calculatePercentages(trainings)
        }
    }


    render() {
        const {trainings, players} = this.props;
        if ((!isEmpty(players) && isLoaded(players)) && (!isEmpty(trainings) && isLoaded(trainings))) {
            return <EnhancedTable data={this.state.players} players={players}/>
        } else {
            return <LoadingSpinner />
        }
    }
}

const wrappedHome = firebaseConnect([`/${PLAYER_LOCATION}`, `/${TRAINING_LOCATION}`])(HomePresentation);
export const Home = connect(
    ({firebase: {auth, data: {players, trainings}}}) => ({
        auth,
        players,
        trainings
    })
)(wrappedHome);

let counter = 0;

function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return {id: counter, name, calories, fat, carbs, protein};
}

const columnData = [
    {id: 'name', numeric: false, disablePadding: true, label: 'Name'},
    {id: 'trainingParticipation', numeric: true, disablePadding: false, label: 'Trainingsbeteiligung'},
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy} = this.props;

        return (
            <TableHead>
                <TableRow>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                            >
                                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

const toolbarStyles = theme => ({
    root: {
        paddingRight: 2,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.A700,
                backgroundColor: theme.palette.secondary.A100,
            }
            : {
                color: theme.palette.secondary.A100,
                backgroundColor: theme.palette.secondary.A700,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const {classes} = props;

    return (
        <Toolbar
            className={classes.root}
        >
            <div className={classes.title}>
                <Typography type="title">Nutrition</Typography>
            </div>
            <div className={classes.spacer}/>
        </Toolbar>
    );
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            data: this.props.data,
            page: 0,
            rowsPerPage: 5,
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({data, order, orderBy});
    };

    render() {
        const classes = this.props.classes;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                <div className={classes.tableWrapper}>
                    <Table>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data.map(players => {
                                const player = this.props.players[players[0]];
                                const name = `${player.firstName} ${player.lastName}`;

                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={players[0]}
                                    >
                                        <TableCell padding="none">{name}</TableCell>
                                        <TableCell numeric>{players[1]}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        );
    }
}

EnhancedTable = withStyles(styles)(EnhancedTable);
