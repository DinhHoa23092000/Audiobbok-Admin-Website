import React, { Component } from "react";
import {Link} from "react-router-dom";
import { Table, Button, Popconfirm, Row, Col, Upload } from "antd";
import {DeleteOutlined, UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { ExcelRenderer } from "react-excel-renderer";
import { EditableFormRow, EditableCell } from "./utils/editable";
import 'antd/dist/antd.css';
import { FcPrevious} from "react-icons/fc";
export default class ExcelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: [],
      errorMessage: null,
      columns: [
        {
          title: "NAME",
          dataIndex: "name",
          editable: true
        },
        {
          title: "TYPE",
          dataIndex: "type",
          editable: true
        },
        {
          title: "AUTHOR",
          dataIndex: "author",
          editable: true
        },
        {
          title: "DESCRIPTION",
          dataIndex: "description",
          editable: true
        },
        {
          title: "Action",
          dataIndex: "action",
          render: (text, record) =>
            this.state.rows.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.key)}
              >
                <DeleteOutlined
                  theme="filled"
                  style={{ color: "red", fontSize: "20px" }}
                />
              </Popconfirm>
            ) : null
        }
      ]
    };
  }

  handleSave = row => {
    const newData = [...this.state.rows];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ rows: newData });
  };

  checkFile(file) {
    let errorMessage = "";
    if (!file || !file[0]) {
      return;
    }
    const isExcel =
      file[0].type === "application/vnd.ms-excel" ||
      file[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload Excel file!";
    }
    console.log("file", file[0].type);
    const isLt2M = file[0].size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMessage = "File must be smaller than 2MB!";
    }
    console.log("errorMessage", errorMessage);
    return errorMessage;
  }

  fileHandler = fileList => {
    console.log("fileList", fileList);
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({
        errorMessage: "No file uploaded!"
      });
      return false;
    }
    console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!"
      });
      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined") {
            newRows.push({
              key: index,
              name: row[0],
              image: row[1],
              type: row[2],
              author: row[3],
              description: row[4],
              content: row[5],
              video: row[6],
              id_video: row[7],
              audio: row[8],
              status: row[9]
            });
          }
        });
        if (newRows.length === 0) {
          this.setState({
            errorMessage: "No data found in file!"
          });
          return false;
        } else {
          this.setState({
            cols: resp.cols,
            rows: newRows,
            errorMessage: null
          });
        }
      }
    });
    return false;
  };

  handleSubmit = async () => {
    let arrStory = {
      input :this.state.rows
    }
    let postInJson = JSON.stringify(arrStory);
    console.log(postInJson);
    fetch("https://whispering-hollows-85804.herokuapp.com/api/addliststories", {
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: postInJson
    })
    .then((response)=>{
      if(response.status == 200){
        alert ("Sucess!");
        window.location.reload();
      }
      else{
        alert ("Can't add story!");
        window.location.reload();
      }
    }); 
  };

  handleDelete = key => {
    const rows = [...this.state.rows];
    this.setState({ rows: rows.filter(item => item.key !== key) });
  };
  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.state.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <>
      <main role="main">
        <section className="panel important">
        <div style={{display: "flex",}}>
          <button style={{border:"none", background:"white", color:"#1eb6a7"}}><Link to={"/admin/table/story"}><FcPrevious/></Link></button><h2>ADD STORY</h2></div>
        <hr/>
        <Row gutter={16}>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2%"
            }}>
            <div style={{ display: "flex", alignItems: "center", marginLeft: "2%"}}>
              <div className="page-title"><h5>Upload Story Data</h5></div>
            </div>
          </Col>
          <Col span={8}>
            <a href="https://dl.dropboxusercontent.com/s/x2nktrynkm01trc/AddListStories.xlsx?dl=0"
              target="_blank"
              rel="noopener noreferrer"
              download
              style={{ color: "blue"}}>
              Download Template
            </a>
          </Col>
          <Col
            span={8}
            align="right"
            style={{ float: "right"}}>
            {this.state.rows.length > 0 && (
              <>
                <Button
                  onClick={this.handleSubmit}
                  size="large"
                  type="primary"
                  style={{ marginBottom: 16, marginLeft: 40 }}>
                  Submit Data
                </Button>
              </>
            )}
          </Col>
        </Row>
        <div>
          <Upload
            name="file"
            beforeUpload={this.fileHandler}
            onRemove={() => this.setState({ rows: [] })}
            multiple={false}>
            <Button style={{marginLeft: "5%"}}>
              <UploadOutlined /> Click to Upload Excel File
            </Button>
          </Upload>
        </div>
        <hr/>
        <div style={{ marginTop: 20, marginRight: 50 }}>
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            dataSource={this.state.rows}
            columns={columns}
          />
        </div>
        </section>
        </main>
      </>
    );
  }
}
