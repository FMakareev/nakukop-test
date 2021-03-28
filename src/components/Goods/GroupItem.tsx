import React from 'react';
import {Collapse} from 'antd';

const {Panel} = Collapse;

type Props = {
  header: string;
  children: any;
}

export const GroupItem = ({header, children}: Props) => {
  return (
    <Collapse>
      <Panel header={header} key={header}>
        {children}
      </Panel>
    </Collapse>
  );
};
