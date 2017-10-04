import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firebaseConnect, isEmpty, isLoaded} from 'react-redux-firebase'
import {PLAYER_LOCATION, TRAINING_LOCATION} from "./constants/api.constants";
import {Paper, Table, Tooltip} from "material-ui";
import {
    TableBody, TableCell, TableHead,
    TableRow, TableSortLabel
} from "../../node_modules/material-ui/Table/index";
import {withStyles} from 'material-ui/styles';
import {LoadingSpinner} from "./loading.spinner";

class HomePresentation extends Component {
    state = {
        players: []
    };

    calculatePercentages = (trainings) => {
        const trainingsMap = new Map();
        const trainingsForSeason = Object.keys(trainings)
            .filter(key => trainings[key].season === '-Kvc-U5OJm8XJRgh-F04')
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

const columnData = [
    {id: 'name', numeric: false, disablePadding: true, label: 'Name'},
    {id: 'trainingParticipation', numeric: true, disablePadding: false, label: 'Trainingsbeteiligung'},
    {id: 'trainingPercentParticipation', numeric: true, disablePadding: false, label: 'Prozentuale Beteiligung'}
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

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data})
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
        const {data, order, orderBy, selected} = this.state;

        return (
            <Paper className={classes.root}>
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
