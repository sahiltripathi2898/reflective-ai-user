import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: '20px',
		marginTop: '100px',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	font: {
		fontSize: '30px',
	},
}));

export default function FullWidthGrid() {
	const classes = useStyles();

	const [selectedDate, setSelectedDate] = React.useState(
		new Date('2014-08-18T21:11:54')
	);

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const matches = useMediaQuery('(min-width:960px)');
	const matchesNew = useMediaQuery('(min-width:550px)');
	const divHeight = matches ? '200px' : '350px';
	const fontHead = matchesNew ? '24px' : '18px';
	const fontCon = matchesNew ? '18px' : '14px';
	const buttonFont = matchesNew ? '' : '10px';

	return (
		<div className={classes.root}>
			<div
				className={classes.font}
				style={{ fontWeight: '600', color: '#2c387e' }}
			>
				404/2 Building 6
			</div>
			<div style={{ fontSize: '26px', fontWeight: '600', color: '#2c387e' }}>
				280 Main St.
			</div>
			<Paper
				elevation={6}
				spacing={1}
				style={{
					height: divHeight,
					borderRadius: '10px',
					marginTop: '40px',
					position: 'relative',
				}}
			>
				<Grid
					container
					spacing={4}
					style={{
						marginTop: '40px',
						position: 'relative',
						padding: '20px',
					}}
				>
					<Grid item md={3} xs={6}>
						<div
							style={{
								position: 'absolute',
								marginTop: '4px',
								fontSize: fontCon,
							}}
						>
							Assignee :
						</div>
						<div
							style={{
								position: 'absolute',
								marginTop: '30px',
								fontSize: fontHead,
								fontWeight: '600',
							}}
						>
							Ryan Jensen
						</div>
						<div
							style={{
								position: 'absolute',
								marginTop: '74px',
								fontSize: fontCon,
							}}
						>
							Days Issue Open :
						</div>
						<div
							style={{
								position: 'absolute',
								marginTop: '100px',
								marginBottom: '30px',
								fontSize: fontHead,
								fontWeight: '600',
							}}
						>
							4
						</div>
					</Grid>
					<Grid item md={3} xs={6}>
						<Typography variant="h6" style={{ marginTop: '10px' }}>
							From Date :
						</Typography>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								margin="normal"
								id="date-picker-dialog"
								label="Date picker dialog"
								format="MM/dd/yyyy"
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item md={3} xs={6}>
						<Typography variant="h6" style={{ marginTop: '10px' }}>
							To Date :
						</Typography>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								margin="normal"
								id="date-picker-dialog"
								label="Date picker dialog"
								format="MM/dd/yyyy"
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item md={3} xs={6}>
						<Button
							variant="contained"
							color="primary"
							style={{
								marginTop: '60px',
								marginLeft: '10px',
								fontSize: buttonFont,
							}}
						>
							Generate Report
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}
