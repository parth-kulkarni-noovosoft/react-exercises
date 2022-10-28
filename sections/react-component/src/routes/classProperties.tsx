import React from "react";

class ChildWithNoDefaultProps extends React.Component<{ color?: string | null }> {
    render(): React.ReactNode {
        return <>This has the default state of: {this.props.color}</>
    }
}

class ChildWithDefaultProps extends React.Component<{ color?: string | null }> {
    render(): React.ReactNode {
        return <>This has the default state of: {this.props.color}</>
    }
}

// @ts-ignore
ChildWithDefaultProps.defaultProps = {
    color: 'None'
}

type TestCaseProps = {
    title: string;
    prop?: null | string;
    children: React.ReactNode
}
class TestCase extends React.Component<TestCaseProps> {
    render(): React.ReactNode {
        return <div className="box">
            <div><strong>{this.props.title}</strong></div>
            <div>Prop: {'' + this.props.prop}</div>
            {this.props.children}
        </div>
    }
}

class TestCaseForNoDefaultProps extends React.Component<Pick<TestCaseProps, 'prop'>> {
    render() {
        return <TestCase
            title='Element with No Default Props'
            prop={this.props.prop}
        >
            <ChildWithNoDefaultProps color={this.props.prop} />
        </TestCase>
    }
}

class TestCaseForDefaultProps extends React.Component<Pick<TestCaseProps, 'prop'>> {
    render() {
        return <TestCase
            title='Element with Default color Prop as "None"'
            prop={this.props.prop}
        >
            <ChildWithDefaultProps color={this.props.prop} />
        </TestCase>
    } 
}

export default class StateAndPropsDemo extends React.Component {
    testProps = [undefined, null, 'Red'];
    
    render(): React.ReactNode {
        return <div className="m-2">
            {this.testProps.map(prop => <TestCaseForNoDefaultProps prop={prop}/>)}
            <br />
            {this.testProps.map(prop => <TestCaseForDefaultProps prop={prop}/>)}
        </div>
    }
}
