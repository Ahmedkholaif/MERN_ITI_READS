import React from 'react';

const AdminContext = React.createContext();
const AdminProvider = AdminContext.Provider;
const AdminConsumer = AdminContext.Consumer;
export {AdminConsumer, AdminProvider};