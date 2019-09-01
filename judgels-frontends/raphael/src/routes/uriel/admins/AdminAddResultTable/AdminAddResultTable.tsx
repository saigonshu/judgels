import { HTMLTable } from '@blueprintjs/core';
import * as React from 'react';

import { UserRef } from '../../../../components/UserRef/UserRef';
import { ProfilesMap } from '../../../../modules/api/jophiel/profile';

export interface AdminAddResultTableProps {
  usernames: string[];
  insertedAdminProfilesMap: ProfilesMap;
  alreadyAdminProfilesMap: ProfilesMap;
}

export class AdminAddResultTable extends React.PureComponent<AdminAddResultTableProps> {
  render() {
    return (
      <>
        {this.renderAdminsTable('Added admins', this.props.insertedAdminProfilesMap)}
        {this.renderAdminsTable('Already admins', this.props.alreadyAdminProfilesMap)}
        {this.renderUnknownAdminsTable()}
      </>
    );
  }

  private renderAdminsTable = (title: string, profilesMap: ProfilesMap) => {
    const usernames = Object.keys(profilesMap)
      .slice()
      .sort((u1, u2) => u1.localeCompare(u2));

    if (usernames.length === 0) {
      return null;
    }

    const rows = usernames.map(username => (
      <tr key={username}>
        <td>
          <UserRef profile={profilesMap[username]} />
        </td>
      </tr>
    ));

    return (
      <>
        <h5>
          {title} ({usernames.length})
        </h5>
        <HTMLTable striped className="table-list-condensed uriel-admin-dialog-result-table">
          <tbody>{rows}</tbody>
        </HTMLTable>
      </>
    );
  };

  private renderUnknownAdminsTable = () => {
    const knownUsernames = [
      ...Object.keys(this.props.insertedAdminProfilesMap),
      ...Object.keys(this.props.alreadyAdminProfilesMap),
    ];
    const usernames = this.props.usernames
      .filter(u => knownUsernames.indexOf(u) === -1)
      .slice()
      .sort((u1, u2) => u1.localeCompare(u2));

    if (usernames.length === 0) {
      return null;
    }

    const rows = usernames.map(username => (
      <tr key={username}>
        <td>{username}</td>
      </tr>
    ));

    return (
      <>
        <h5>Unknown users ({usernames.length})</h5>
        <HTMLTable striped className="table-list-condensed uriel-admin-dialog-result-table">
          <tbody>{rows}</tbody>
        </HTMLTable>
      </>
    );
  };
}
