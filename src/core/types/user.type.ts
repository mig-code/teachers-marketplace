export type UserStructure = {
    info: {
        firebaseId: string;
        name: string | null;
        photoUrl: string | null;
    };
    token: string;
};
