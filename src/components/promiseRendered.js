import React from "react";
import {pure} from "recompose";
import PropTypes from "prop-types";

export class Deferred extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    componentDidMount() {
        this.props.promise.then(value => {
            this.setState({value});
        });
    }

    render() {
        const then = this.props.then || (value => <span>{value}</span>);
        return then(this.state.value);
    }
}

export const PromiseRenderer = React.memo(pure((props) => {
    const [value, setValue] = React.useState("");
    React.useEffect(() => {
        props.promise.then((resolve) => setValue(resolve)).catch(e => setValue("An Error Occurred"));
    });
    return value;
}));
PromiseRenderer.propTypes = {
    promise: PropTypes.any.isRequired,
    then: PropTypes.func.isRequired
};
