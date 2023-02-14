import React from 'react';
import { UserInfo } from '../components/user.info/user.info';

import { UserList } from '../components/user.list/user.list';

export default function UserPage() {
    return (
        <>
            <UserInfo></UserInfo>
            <UserList></UserList>
        </>
    );
}
