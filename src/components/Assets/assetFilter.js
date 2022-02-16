import React, { Component } from "react";
import { Form, FormControl } from "react-bootstrap";
import InputRange from 'react-input-range';


class AssetFilter extends Component {
      constructor(props) {
        super(props);
    
        this.state = { value: 250000 };
      }
    render() {
        return (
            <div>
                <Form className="search-form">
                    <Form.Label id="formLabel">Search</Form.Label>
                    <FormControl type="text" placeholder="Search by name or location" />
                    {/* <Button type="submit">Submit</Button> */}
               {/*  </Form>
                <Form> */}
                    <Form.Label id="formLabel">Type</Form.Label>
                    {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                            <Form.Check
                                type={type}
                                id={`default-${type}`}
                                label='Property'
                            />
                            <Form.Check
                                type={type}
                                id={`default-${type}`}
                                label='Private Equity'
                            />
                            <Form.Check
                                type={type}
                                id={`default-${type}`}
                                label='Private Debt'
                            />
                        </div>
                    ))}
                </Form>
                <Form>
                    <Form.Label id="formLabel">Price Range</Form.Label>
                    <InputRange
                        draggableTrack
                        maxValue={500000}
                        minValue={5000}
                        value={this.state.value}
                        formatLabel={value => `$${value}`}
                        onChange={value => this.setState({ value })}
                        onChangeComplete={value => console.log(value)} />
                </Form>
                <Form>
                    <Form.Label id="formLabel">Investment Term</Form.Label>
                    {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                            <Form.Check
                                type={type}
                                id={`default-${type}`}
                                label='< 6 months'
                            />
                            <Form.Check
                                type={type}
                                id={`default-${type}`}
                                label='6 - 12 months'
                            />
                            <Form.Check
                                type={type}
                                id={`default-${type}`}
                                label='1 - 5 years'
                            />
                            <Form.Check
                                type={type}
                                id={`default-${type}`}
                                label='5 + years'
                            />
                        </div>
                    ))}
                </Form>
            </div>
        );
    }
}



export default AssetFilter;