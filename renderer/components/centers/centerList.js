import React from 'react';
import { Input, Table } from 'antd';

const Search = Input.Search;

export default class CenterList extends React.Component{
    constructor(props) {
        super(props)
        // this.handleSelector = this.handleSelector.bind(this);
        this.state = {
          dataSource: [],
        };

        this.state.dataSource = this.props.dataSource;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: nextProps.dataSource
        });
    }
    
    onSearch = e => {
        const value = e.target.value.toLowerCase()
        const newData = this.props.dataSource.filter(
            s => s.session_counr.search(value) !== -1
        );
        this.setState({ dataSource: newData });
    }

    render(){
        const columns = [
                { title: 'Session', dataIndex: 'session_count', key: 'session_count' },
                { title: 'Snack', dataIndex: 'snack_count', key: 'snack_count' },
                // { title: 'Lunch', dataIndex: 'lunch_count', key: 'lunch_count' },
                { title: 'Amount', dataIndex: 'amount', key: 'amount' },
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
                    <h2>List of Configurations</h2>
                    <div className="table-container">
                        <Table
                            className="center-list-table"
                            // bordered
                            // loading={(dataSource.length !== 0) ? false : true}
                            dataSource={this.state.dataSource}
                            columns={columns} />
                    </div>
                </div>
                </div>
            );
        }    
}