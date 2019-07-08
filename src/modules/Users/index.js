import React, { Component } from 'react'
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

import "./style.css"

const data = [
    {
      key: '1',
      id: 1,
      name: 'John Brown',
      phone: '+39234154867',
      isActive: true,
    },
    {
      key: '2',
      id: 2,
      name: 'Joe Black',
      phone: '+42456867238',
      isActive: true,
    },
    {
      key: '3',
      id: 3,
      name: 'Jim Green',
      phone: '+42456867238',
      isActive: false,
    },
    {
      key: '4',
      id: 4,
      name: 'Jim Red',
      phone: '+42423654838',
      isActive: true,
    },
  ];

class Users extends Component {
    state = {
        searchText: '',
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
    });
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    render() {
      const { history } = this.props;
      const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              width: '50%',
              ...this.getColumnSearchProps('name'),
            },
            {
              title: 'Phone',
              dataIndex: 'phone',
              key: 'phone',
              width: '40%',
              ...this.getColumnSearchProps('phone'),
            },
            {
              title: 'Activity',
              dataIndex: 'activity',
              key: 'activity',
              width: '10%',
              render: (text, record) => record.isActive ? <Icon type="check" style={{ color: "green"}}/> : <Icon type="close" style={{ color: "red"}}/>
            },
          ];
        return (
            <div className="users">
                <span className="title">Users</span>
                <Table columns={columns} dataSource={data} 
                  onRow={record => ({
                      onClick: event => {history.push(`user/${record.id}`)} // click row
                    })
                  }
                />
            </div>
        )
    }
}

export default Users 