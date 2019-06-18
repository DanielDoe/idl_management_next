import React, { useState, useEffect, useContext } from 'react';
import { Input, Table, Row, Col, Select } from 'antd';
import StudentContext from './student-context';

const Search = Input.Search;
const Option = Select.Option;
export default props => {
	const dataSource = props.students.map((elem, id) => {
		return {
			...elem,
			key: id,
			sn: id + 1,
		};
	});

    const context = useContext(StudentContext);
    const [center, setcenter] = useState("all");
    const [programme, setprogramme] = useState("all");
	const [dataSearch, setdataSearch] = useState(dataSource);
	const [width, setwidth] = useState(window.innerWidth);
	const [height, setheight] = useState(window.innerHeight);

	useEffect(() => {
		setwidth(window.innerWidth);
		setheight(window.innerHeight);
	}, [height, width]);

	useEffect(() => {
		const dataSource = props.students.map((elem, id) => {
			return {
				...elem,
				key: id,
				sn: id + 1,
			};
		});
		setdataSearch(dataSource);
    }, [props.students]);
    
    const renderCenterData = () => {
        const centers = props.centers.map((element, index) => {
          // console.log(element.name);
          return (
            <Option value={element.center_id} key={element.center_name + index}>
              {element.center_name}
            </Option>
          );
        });
    
        return centers;
      };
    
      const renderProgramData = () => {
        const programmes = props.programmes
          .filter(element => element.center_id === props.user.center_id)
          .map((element, index) => {
            // console.log(element.name);
            return (
              <Option
                value={element.programme_id}
                key={element.name + element.year}
              >
                {element.programme_name}
              </Option>
            );
          });
    
        return programmes;
      };

	const onSearch = e => {
		const value = e.target.value.toLowerCase();
		const newData = dataSource.filter(s => s.student_title.toLowerCase().search(value) !== -1);
		setdataSearch(newData);
	};

	const columns = [
		{ title: 'SN', dataIndex: 'sn', key: 'sn' },
        { title: 'Name', dataIndex: 'student_name', key: 'student_name' },
        { title: 'Reference no.', dataIndex: 'ref_number', key: 'ref_number' },
		{ title: 'Index no.', dataIndex: 'index_number', key: 'index_number' },
		
		// { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
		{
			title: ' ',
			render: (text, record) => (
				<div className="action-column grid">
					<button className="edit column" onClick={() => props.onValueEditted(record)}>
						Edit
					</button>
					<button className="delete column" onClick={() => context.removeStudentElements(record)}>
						Delete
					</button>
				</div>
			),
		},
	];

	return (
		<div>
			<div>
				<Row gutter={12}>
					<Col span={8}>
                    <Select
              className="exam-selector"
              defaultValue={
                props.user.auth_status !== "admin" ? props.user.center : center
              }
              disabled={props.user.auth_status !== "admin" ? true : false}
              onChange={e => setcenter(e)}
            >
              {renderCenterData()}
              <Option value="all">all centers</Option>
            </Select>
                    </Col>
                    <Col span={8}>
                    <Select
              placeholder="Programme"
              className="exam-selector"
              defaultValue="all"
              onChange={e => setprogramme(e)}
            >
              {renderProgramData()}
              <Option value="all">all programmes</Option>
            </Select>
                    </Col>
					<Col span={8}>
						<Search
							placeholder="search for programme"
							// size="large"
							onChange={e => onSearch(e)}
							onSearch={value => console.log(value)}
							style={{ width: '90%' }}
						/>
					</Col>
				</Row>
			</div>
			<div className="student-list column">
				<div className="list-container">
					<h2>List of students</h2>
					<div className="table-container">
						<Table
							pagination={{ pageSize: height / 100 }}
							// loading={dataSource.length !== 0 ? false : true}
							className="student-list-table"
							dataSource={dataSearch}
							columns={columns}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
