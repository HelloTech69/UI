export const RoleGroups = {
  ADMIN: {
    name: 'Admin',
    roles: [
      'org.admin',
      'org.permissions.one.read',
      'org.permissions.one.write',
      'org.permissions.two.read',
      'org.permissions.three.read',
    ],
  },
  USER: {
    name: 'User',
    roles: [
      'org.user',
      'org.permissions.posts.list',
      'org.permissions.posts.show',
      'org.permissions.posts.edit',
      'org.permissions.posts.create',
      'org.permissions.one.read',
      'org.permissions.three.read',
    ],
  },
};
