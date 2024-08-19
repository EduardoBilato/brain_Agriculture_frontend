import React from 'react';

export default function Col({children}) {
    return (
        <div style={{ margin: 8 , padding: 8, display: 'flex', flexDirection: 'collumn' }}>
            {children}
        </div>
    );
}   