import React from 'react';
import { observer } from "mobx-react-lite";
import { Table as BootstrapTable } from 'reactstrap';

export type Columns<T> = {
    heading: string,
    selector: (data: T) => React.ReactNode
}

interface ITableProps<T> {
    tableContent: T[] | null;
    colConfigs: Columns<T>[];
}

function Table<T extends { id: string | number }>(props: ITableProps<T>) {
    const { tableContent, colConfigs } = props;
    return (
        <BootstrapTable
            bordered
            size='sm'
        >
            <tbody>
                <tr>
                    {colConfigs.map((config, index) => <th key={index}>{config.heading}</th>)}
                </tr>
                {tableContent?.map((entity, index) => (
                    <tr key={index}>
                        {colConfigs.map((config, index) => (
                            <td
                                key={`${entity.id}-${index}`}
                                className='py-1'
                            >
                                {config.selector(entity)}
                            </td>)
                        )}
                    </tr>
                ))}
            </tbody>
        </BootstrapTable>
    );
}

export default observer(Table);