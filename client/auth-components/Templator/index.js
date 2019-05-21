import React, { Component } from 'react';
import SaleSign from './SaleSign';
import axios from 'axios';
import { ColorSelector } from '../../sub-components';
import { WindoW, Flex } from '../../sub-components/containers';
class Templator extends Component {
  state = {
    template: [],
    fileupload: '',
    primaryColor: 'marron',
    secondaryColor: '#333',
    signDate: 'Valid through 3-16-19 thru 3-29-19',
    signHeader: 'As Advertised',
    option: 'excel',
    item: '',
    price: '',
    size: '',
    signSize: { width: '45%', height: '45%' },
    containerSize: '216mm'
  };

  colorSelector1 = React.createRef();
  colorSelector2 = React.createRef();

  componentDidMount() {
    // this.createTemplate();
  }

  setColors = () => {
    console.log(this.colorSelector1);
    const primaryColor = this.colorSelector1.current.state.background;
    const secondaryColor = this.colorSelector2.current.state.background;
    this.setState({ primaryColor, secondaryColor });
  };

  createTemplate = saleSignsToRender => {
    const outerTemplate = [];
    let innerTemplate = [];
    while (saleSignsToRender.length !== 0) {
      let signData = saleSignsToRender.shift();
      if (Object.keys(signData).length > 2) {
        if (innerTemplate.length < 4) {
          innerTemplate.push(signData);
        } else {
          outerTemplate.push(innerTemplate);
          innerTemplate = [];

          innerTemplate.push(signData);
        }

        console.log(outerTemplate);
      }
    }
    this.setState({ template: outerTemplate });
  };

  handleFileUpload = async event => {
    console.log(event.target.files[0]);
    const excelSheet = new FormData();
    excelSheet.append('file', event.target.files[0]);
    const { data } = await axios({
      method: 'post',
      data: excelSheet,
      url: 'https://westchester-apis.herokuapp.com/upload',
      withCredentials: false
    });
    console.log(data);
    const jsonData = await axios({
      method: 'post',
      url: 'https://westchester-apis.herokuapp.com/api/excel-json',
      data: { filepath: data },
      withCredentials: false
    });

    console.log(jsonData.data);
    const saleJson = jsonData.data.data.Sheet1;
    // const saleJson = JSON.parse(data.string);
    this.createTemplate(saleJson);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  selectBuilder = option => {
    this.setState({ option });
  };

  createSingleSign = event => {
    event.preventDefault();
    const { template, item, price, size } = this.state;
    const curr = template[template.length - 1];
    if (!curr) {
      template.push([{ C: item, I: price, H: size }]);
    } else if (curr.length === 4) {
      template.push([{ C: item, I: price, H: size }]);
    } else {
      template[template.length - 1].push({ C: item, I: price, H: size });
    }
    this.setState({ template, size: '', price: '', item: '' });
  };

  changeSignSize = size => {
    switch (size) {
      case 'large':
        return this.setState({ signSize: { width: '95%', height: '200mm' }, containerSize: 'auto' });
      case 'medium':
        return this.setState({ signSize: { width: '45%', height: '45%' }, containerSize: '212mm' });
      case 'small':
        return this.setState({ signSize: { width: '35%', height: '35%' }, containerSize: '212mm' });
      default:
        return this.setState({ signSize: { width: '45%', height: '45%' }, containerSize: '212mm' });
    }
  };

  render() {
    const {
      fileupload,
      template,
      primaryColor,
      secondaryColor,
      signHeader,
      signDate,
      option,
      item,
      price,
      size,
      signSize,
      containerSize
    } = this.state;
    return (
      <WindoW>
        <Flex column className="no-print">
          <Flex row>
            <button
              onClick={() => this.selectBuilder('excel')}
              className="button"
            >
              Excel
            </button>
            <button
              onClick={() => this.selectBuilder('single')}
              className="button"
            >
              Single Sign
            </button>
          </Flex>
          <Flex justify="justify-space-evenly" row>
            <ColorSelector ref={this.colorSelector1} />
            <ColorSelector ref={this.colorSelector2} />
          </Flex>
          <button type="button" className="button" onClick={this.setColors}>
            Set Colors
          </button>
          <Flex row>
          <button
              onClick={() => this.changeSignSize('small')}
              className="button"
            >
              Small
          </button>
            <button
              onClick={() => this.changeSignSize('medium')}
              className="button"
            >
              Medium
            </button>
            <button
              onClick={() => this.changeSignSize('large')}
              className="button"
            >
              Large
            </button>
          </Flex>
          <input
            name="signHeader"
            onChange={this.handleChange}
            // onClick={error && this.removeError}
            className="textfield"
            value={signHeader}
            type="sign-header"
            placeholder="Sign Header"
          />
          <input
            name="signDate"
            onChange={this.handleChange}
            // onClick={error && this.removeError}
            className="textfield"
            value={signDate}
            type="sign-date"
            placeholder="Sign Date"
          />

          {option === 'excel' ? (
            <div className="flex column items-center">
              <h1>{this.fileupload}</h1>

              <input
                type="file"
                className="button"
                name="fileupload"
                value={fileupload}
                onChange={this.handleFileUpload}
              />
            </div>
          ) : (
            <form onSubmit={this.createSingleSign} className="flex column">
              <input
                className="textfield"
                name="item"
                placeholder="Item"
                value={item}
                onChange={this.handleChange}
              />
              <input
                className="textfield"
                name="price"
                placeholder="Price"
                value={price}
                onChange={this.handleChange}
              />
              <input
                className="textfield"
                name="size"
                placeholder="Size"
                value={size}
                onChange={this.handleChange}
              />
              <button type="submit" className="button">
                Create Sign
              </button>
            </form>

          )}
        </Flex>
        <div className="flex column align-center ">
          {template.map((pageData, index) => {
            console.log(pageData);
            return (
              <div
                className="sale-sign__divider flex column wrap justify-space-evenly align-center"
                key={index}
                style={{height: containerSize}}
              >
                {pageData.map((signData, innerIndex) => {
                  console.log(signData);
                  return (
                    <SaleSign
                      key={innerIndex}
                      primaryColor={primaryColor}
                      secondaryColor={secondaryColor}
                      sign={signData}
                      signHeader={signHeader}
                      signDate={signDate}
                      signSize={signSize}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </WindoW>
    );
  }
}

export default Templator;
