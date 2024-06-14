import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export const Flex = ({ children, className, style, flexDirection, alignItems, justifyContent, flexWrap, onClick  }) => {
    const combinedStyle = { ...style, flexDirection, alignItems, justifyContent, flexWrap };

    return (
        <div className={`div ${className}`} style={combinedStyle} onClick={onClick}>
            {children}
        </div>
    );
};

Flex.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    flexDirection: PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse']),
    alignItems: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
    justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),
    flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
    onClick: PropTypes.func,
};

Flex.defaultProps = {
    className: '',
    style: {},
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    onClick: () => {}
};
