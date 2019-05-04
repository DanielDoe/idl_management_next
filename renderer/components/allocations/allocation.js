import React, { useState } from 'react';
import { Row, Col } from 'antd';
import AllocationContext from './allocation-context';
import { AddAllocation } from './newAllocation';
import AllocationList from './allocationList';
import './allocation.css';

export default () => {
	const [allocations, setAllocations] = useState([
		{
			name: 'Accra',
			code: 'ACC',
		},
		{
			name: 'Volta',
			code: 'VR',
		},
		{
			name: 'Kumasi',
			code: 'KMA',
		},
	]);

	const addAllocationElements = allocation => {
		// updatedAllocations = Allocations
		// setAllocations(newAllocation);
		let newAllocation = [];
		console.log('Adding Allocations', newAllocation);
		// setAllocations(Allocations.push(Allocation))
	};

	const removeAllocationElements = allocation => {
		console.log('Removing Allocations', allocation);
	};

	const updateAllocationElements = allocation => {
		console.log('Updating Allocations', allocation);
	};

	return (
		<AllocationContext.Provider
			value={{
				allocations: allocations,
				addAllocationElements: addAllocationElements,
				removeAllocationElements: removeAllocationElements,
				updateAllocationElements: updateAllocationElements,
			}}
		>
			<div style={{ width: '100%' }} id="allocation">
				<div style={{ paddingTop: '1rem', height: '100%' }}>
					<Row style={{ height: '100%' }}>
						<Col span={16} style={{ height: '100%' }}>
							<AllocationList />
						</Col>
						<Col span={8} style={{ height: '100%', borderLeft: '1px solid rgba(0,0,0,0.12)' }}>
							<AddAllocation />
						</Col>
					</Row>
				</div>
			</div>
		</AllocationContext.Provider>
	);
};
