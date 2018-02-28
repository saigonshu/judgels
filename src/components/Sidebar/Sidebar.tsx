import { Icon, IconName, Tab2, Tabs2 } from '@blueprintjs/core';
import * as React from 'react';

import { Card } from '../Card/Card';

import './Sidebar.css';

export interface SidebarItem {
  id: string;
  titleIcon?: IconName;
  title: string;
}

export interface SidebarProps {
  title: string;
  action?: JSX.Element;
  activeItemId: string;
  items: SidebarItem[];
  onItemClick: (parentPath: string, itemId: string) => void;
}

export class Sidebar extends React.Component<SidebarProps> {
  render() {
    const { title, action, activeItemId, items, onItemClick } = this.props;

    const tabs = items.map(item => {
      const titleIcon = item.titleIcon && <Icon iconName={item.titleIcon} />;

      const icon = item.id === activeItemId && (
        <Icon iconName="chevron-right" iconSize={Icon.SIZE_LARGE} className="card-sidebar__arrow" />
      );

      return (
        <Tab2 key={item.id} id={item.id}>
          <span>
            {titleIcon}
            {titleIcon && <span>&nbsp;&nbsp;</span>}
            {item.title}
          </span>
          {icon}
        </Tab2>
      );
    });

    return (
      <Card className="card-sidebar" title={title} action={action} actionRightJustified>
        <Tabs2 id="sidebar" selectedTabId={activeItemId} onChange={onItemClick} vertical renderActiveTabPanelOnly>
          {tabs}
        </Tabs2>
      </Card>
    );
  }
}
