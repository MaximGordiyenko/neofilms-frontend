import React from 'react';
import PropTypes from 'prop-types';
import './Text.scss';

export const Text = ({ children, className, style, as: Component = 'p', opacity, textTransform   }) => {
    const combinedStyle = { ...style, opacity, textTransform  };
    return (
        <Component className={`text ${className}`} style={combinedStyle}>
            {children}
        </Component>
    );
};
