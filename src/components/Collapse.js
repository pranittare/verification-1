import React, { useState } from 'react';
import { Collapse, Button } from 'reactstrap';

export default function CollapseItem({ title, children, id }) {
    const [isOpen, setIsOpen] = useState(id ? true : false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div className='mt-1 mb-1'>
            <Button color="primary" onClick={toggle}>{title}</Button>
            <Collapse isOpen={isOpen}>
                {children}
            </Collapse>
        </div>
    )
}
