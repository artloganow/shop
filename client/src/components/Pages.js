import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { AppContext } from './AppContext';

const Pages = observer(() => {
    const {catalog} = useContext(AppContext)
    const pageCount = Math.ceil(catalog.count / catalog.limit)
    const pages = []
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)        
    }
    return (
        <Pagination className='mt-5'>
            {pages.map(page => 
                <Pagination.Item
                    key={page}
                    active={catalog.page === page}
                    onClick={() => catalog.setPage(page)}
                >
                    {page}
                </Pagination.Item>    
            )}
        </Pagination>
    );
});

export default Pages;