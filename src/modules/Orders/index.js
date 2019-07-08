import React, { Component } from 'react'
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';


import "./style.css"

const data = [
    {
      key: '1',
      id: 1,
      orderNumber: 1,
      bagNumber: 123, 
      client: "Jonh Gur",
      address: "Krogstrupvej 16, Herning",
    },
    {
      key: '2',
      id: 2,
      orderNumber: 2,
      bagNumber: 15, 
      client: "Lucie Gur",
      address: "Håstrupvej 102, Fredericia",
    },
    {
      key: '3',
      id: 3,
      orderNumber: 3,
      bagNumber: 1, 
      client: "Mark Twen",
      address: "Håstrupvej 17, Fredericia",
    },
    {
      key: '4',
      id: 4,
      orderNumber: 4,
      bagNumber: 15, 
      client: "Mark Gur",
      address: "Nordre Ringvej 10, Vojens",
    },
  ];

class Orders extends Component {
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
      const columns = [
            {
              title: 'Order number',
              dataIndex: 'orderNumber',
              key: 'orderNumber',
              width: '10%',
              ...this.getColumnSearchProps('orderNumber'),
            },
            {
              title: 'Bag number',
              dataIndex: 'bagNumber',
              key: 'bagNumber',
              width: '10%',
              ...this.getColumnSearchProps('bagNumber'),
            },
            {
              title: 'Client',
              dataIndex: 'client',
              key: 'client',
              width: '30%',
              ...this.getColumnSearchProps('client'),
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
              width: '30%',
              ...this.getColumnSearchProps('address'),
            },
            {
              title: 'Actions',
              key: 'actions',
              width: '10%',
              render: (text, record) => (
                <Icon type="delete" onClick={()=>console.log(record, "RECORD TO DELETE")}/>
              ),
            },
          ];
        return (
            <div className="orders">
                <span className="title">Orders</span>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

export default Orders 