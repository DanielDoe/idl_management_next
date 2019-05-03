import React from 'react';
import { Input, Table } from 'antd';
import CenterContext from './center-context';

const Search = Input.Search;

export default class CenterList extends React.Component{
    constructor(props) {
        super(props)
        // this.handleSelector = this.handleSelector.bind(this);
        
    }

    static contextType = CenterContext;


    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: nextProps.dataSource
        });
    }

    componentDidMount() {
      console.log("Context: ", this.context)
    }
    
    
    onSearch = e => {
        const value = e.target.value.toLowerCase()
        const newData = this.props.dataSource.filter(
            s => s.session_counr.search(value) !== -1
        );
        this.setState({ dataSource: newData });
    }

    render(){
        const dataSource = this.context.centers.map((elem, id) => {
            return {
                ...elem,
                key: id,
                sn: id + 1
            }
        })

        console.log(dataSource);

        const columns = [
                { title: 'SN', dataIndex: 'sn', key: 'sn' },
                { title: 'Center', dataIndex: 'name', key: 'name' },
                { title: 'Code', dataIndex: 'code', key: 'code' },
                {
                    title: ' ',
                    render: (text, record) => (
                        <div className="action-column grid">
                            <button
                                className="edit column"
                                onClick={() => this.props.onEditClicked(record)}>
                                Edit
                            </button>
                            <button
                                className="delete column"
                                onClick={() => this.props.onDeleteClicked(record)}>
                                Delete
                            </button>
                        </div>
                    )
                }
            ];    

            return (
                <div className="center-list column">
                    <div className="list-container">
                    <h2>List of Centers</h2>
                    <div className="table-container">
                        <Table
                            className="center-list-table"
                            // bordered
                            // loading={(dataSource.length !== 0) ? false : true}
                            dataSource={dataSource}
                            columns={columns} />
                    </div>
                </div>
                </div>
            );
        }    
}