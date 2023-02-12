import React from 'react';
import { UserInfo } from '../components/user.info/user.info';

import { UserList } from '../components/user.list/user.list';

export function UserPage() {
    return (
        <section>
            <UserInfo></UserInfo>
            <UserList></UserList>
        </section>
    );
}
