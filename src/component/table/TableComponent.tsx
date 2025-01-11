import React from 'react';
import { Table, TableColumnsType } from 'antd';
import { createStyles } from 'antd-style';

interface TableProps {
  dataSource:[]; 
  columns: TableColumnsType<any>;
}

const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
      customTable: css`
        ${antCls}-table {
          ${antCls}-table-container {
            ${antCls}-table-body,
            ${antCls}-table-content {
              scrollbar-width: thin;
              scrollbar-color: #eaeaea transparent;
              scrollbar-gutter: stable;
            }
          }
        }
      `,
    };
  });

  const TableComponent: React.FC<TableProps> = ({ dataSource, columns }) => { 
    const { styles } = useStyle();
    return (
      <Table<TableProps>
        className={styles.customTable}
        dataSource={dataSource}
        columns={columns}
       
        scroll={{ x: 'max-content', y: 55 * 5 }}
      />
    );
  };

export default TableComponent;