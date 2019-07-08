import React, { Component } from 'react'
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

import ZoneModal from './components/ZoneModal';

import "./style.css"

let data = [
    {
      key: '1',
      id: 1,
      address: "Krogstrupvej 16, Herning",
      GPS: "55.84323935, 8.93503880", 
    },
    {
      key: '2',
      id: 2,
      address: "Håstrupvej 102, Fredericia",
      GPS: "55.84323935, 8.93503880", 
    },
    {
      key: '3',
      id: 3,
      address: "Håstrupvej 17, Fredericia",
      GPS: "55.84323935, 8.93503880", 
    },
    {
      key: '4',
      id: 4,
      address: "Nordre Ringvej 10, Vojens",
      GPS: "55.84323935, 8.93503880", 
    },
  ];

class Zones extends Component {
    state = {
        searchText: '',
        modalVisible: false,
        recordToEdit: {},
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

    handleDelete = record => {
        data = data.filter(item => item.id !== record.id)
        this.forceUpdate()
    };

    showModal = () => {
      this.setState({
        modalVisible: true,
      });
    };
  
    handleOk = values => {
      if(values.id) {
        let indexToEdit; 
        data.forEach((item, index) => {
          if(item.id === values.id) {
            indexToEdit = index;
            data[indexToEdit] = values;
          }
        })
      } else {
        data.push(values)
      }
      this.setState({
        modalVisible: false,
        recordToEdit: {},
      });
      this.forceUpdate()
    };
  
    handleCancel = () => {
      this.setState({
        modalVisible: false,
        recordToEdit: {},
      });
    };

    editRecord = (values) => {
      this.setState({
        modalVisible: true,
        recordToEdit: values,
      });
    }
    render() {
      const { modalVisible, recordToEdit } = this.state;
      const columns = [
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
              width: '40%',
              ...this.getColumnSearchProps('address'),
            },
            {
              title: 'GPS',
              dataIndex: 'GPS',
              key: 'GPS',
              width: '50%',
              ...this.getColumnSearchProps('address'),
            },
            {
              title: 'Actions',
              key: 'actions',
              width: '10%',
              render: (text, record) => (
                <>
                  <Icon type="delete" onClick={()=>this.handleDelete(record)} style={{margin: 5}}/>
                  <Icon type="edit" onClick={()=>this.editRecord(record)} style={{margin: 5}}/>
                </>
              ),
            },
          ];
        return (
            <div className="zones">
              <div className="table-header">
                <span className="title">Pickup zones</span>
                <Button onClick={this.showModal} type="primary" style={{ marginBottom: 16 }}>
                  Add zone
                </Button>
              </div>
              <Table columns={columns} dataSource={data} />
              <ZoneModal
                visible={modalVisible}
                onOk={this.handleOk}
                defaultValues={recordToEdit}
                onCancel = {this.handleCancel}
              />
            </div>
        )
    }
}

export default Zones 