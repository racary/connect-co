import AccessControl from 'accesscontrol';


// list could be defined/contained in a db
const grantList = [
  { role: 'admin', resource: 'items', action: 'update:any', attributes: '*', },
  { role: 'admin', resource: 'items', action: 'read:any', attributes: '*', },
  { role: 'user', resource: 'items', action: 'read:any', attributes: '*', },
  { role: 'user', resource: 'items', action: 'update:any', attributes: '*"', },
];

const ac = new AccessControl.AccessControl(grantList);



export const canUpdateStatus = (status: string, role: string) => {
  try {
    const permission = ac.can(role).updateAny('items');

    if (permission.granted) {
    if (role === 'user' && status !== 'in-progress') {
      console.error(new Error(`User does not have access to modify resource with value ${status}`));
      return false;
    }
  }

    return permission.granted;
  } catch (err) {
    
    console.error(err);
    return false;
  }
};

export const canRead = (role: string) => {
  try {
    const permission = ac.can(role).readAny('items');
    return permission.granted;
  } catch (err) {
    
    console.error(err);
    return false;
  }
};
