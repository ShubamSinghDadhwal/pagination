import React from 'react';
import './styles.css';

const NoData = (({ msg = '', action }) => {
	return (
		<section className="noDataWrapper">
			<div className='noDataTxt'>
				{msg || 'Sorry! No data found.'}
			</div>
			<div className='action'>{action}</div>
		</section>
	);
});

export { NoData };
