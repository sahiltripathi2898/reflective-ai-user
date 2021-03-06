import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Typography } from '@material-ui/core';
import Spinner from '../../spinner';

function Hotspot(props) {
	const { cID, sDate, eDate } = props;

	const [loading, setLoading] = useState(true);
	const [imgSpinner, setimgSpinner] = useState(false);
	const [hot, setHot] = useState(false);

	const [baseImg, setbaseImg] = useState('');
	const [hotImg, sethotImg] = useState('');
	const [imgSrc, setimgSrc] = useState('');

	var startDate = sDate.toISOString().slice(0, 10) + ' 00:00:00';
	var endDate = eDate.toISOString().slice(0, 10) + ' 23:00:00';

	useEffect(() => {
		fetchData();
	}, [cID, sDate, eDate]);

	const fetchData = async () => {
		const data = {
			project_id: Number(localStorage.getItem('projectID')),
			jwt_token: localStorage.getItem('jwt_token'),
			camera_id: cID,
			start_date: startDate,
			end_date: endDate,
			company_id: Number(localStorage.getItem('company_id')),
		};
		//console.log(data);
		var str =
			'hotspot' +
			'project' +
			Number(localStorage.getItem('projectID')) +
			'camera' +
			cID +
			'company' +
			Number(localStorage.getItem('company_id')) +
			startDate +
			endDate;
		if (localStorage.getItem(str) !== null) {
			const curr = JSON.parse(localStorage.getItem(str));
			setbaseImg(curr.base_image);
			sethotImg(curr.hot_image);
			setimgSrc(curr.base_image);
			setLoading(false);
		} else {
			/*axios
				.post('https://api.reflective.ai/hotspot/image', data)
				.then((res) => {
					//console.log(res.data);
					localStorage.setItem(str, JSON.stringify(res.data));
					setbaseImg(res.data.base_image);
					sethotImg(res.data.hot_image);
					setimgSrc(res.data.base_image);
					setLoading(false);
				})
				.catch((err) => console.log(err)); */
			const res = await axios.post(
				'https://api.reflective.ai/hotspot/image',
				data
			);
			console.log(res);
			localStorage.setItem(str, JSON.stringify(res.data));
			setbaseImg(res.data.base_image);
			sethotImg(res.data.hot_image);
			setimgSrc(res.data.base_image);
			setLoading(false);
		}
	};

	if (loading) return <Spinner />;
	return (
		<div>
			<Typography
				variant="h4"
				style={{
					marginBottom: '20px',
					marginTop: '30px',
					fontFamily: 'Roboto , sans-serif',
					fontWeight: '500',
					fontSize: '1.5rem',
				}}
			>
				Hotspot Analysis
			</Typography>
			{/* 			<div
				style={{
					height: '9px',
					width: '320px',
					backgroundColor: '#179CD5',
					borderRadius: '10px',
					marginBottom: '25px',
				}}
			></div> */}
			<Paper
				style={{ height: '52vw', marginBottom: '50px', padding: '20px' }}
				elevation={10}
			>
				{hot === false && (
					<img
						src={'https://api.reflective.ai/image' + baseImg}
						width="100%"
						height="100%"
						onMouseEnter={() => {
							setimgSpinner(true);
							setHot(true);
						}}
						//onMouseLeave={() => setimgSrc(baseImg)}
						//onLoad={() => setLoading(false)}
					></img>
				)}
				{/* {imgSpinner === true && <Spinner />} */}
				{hot === true && (
					<img
						src={'https://api.reflective.ai/image' + hotImg}
						width="100%"
						height="100%"
						// onMouseEnter={() => {
						// 	setimgSrc(hotImg);
						// 	//setLoading(true);
						// }}
						onMouseLeave={() => setHot(false)}
						onLoad={() => setimgSpinner(false)}
					></img>
				)}
			</Paper>
		</div>
	);
}

export default Hotspot;
