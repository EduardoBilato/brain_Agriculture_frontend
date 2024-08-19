import React from 'react';

export default function Row({children}) {
    return (
        <div style={{ margin: 8 , padding: 8, display: 'flex', flexDirection: 'row' }}>
            {children}
        </div>
    );
}   