export default function setupAssociations(models) {
  const {
    Agenda,
    Agreement,
    Area,
    Meeting,
    Organization,
    Response,
    Role,
    Topic,
    TypeOfMeeting,
    User,
    MeetingWorker,
    OrganizationMember
  } = models;

  Area.hasMany(User, {
    foreignKey: {
      name: 'idArea',
      allowNull: false
    }
  });

  User.belongsTo(Area, {
    foreignKey: {
      name: 'idArea',
      allowNull: false
    }
  });

  Role.hasMany(User, {
    foreignKey: {
      name: 'idRole',
      allowNull: false
    }
  });

  User.belongsTo(Role, {
    foreignKey: {
      name: 'idRole',
      allowNull: false
    }
  });

  User.hasMany(Organization, {
    foreignKey: {
      name: 'idLeader',
      allowNull: false
    }
  });

  Organization.belongsTo(User, {
    foreignKey: {
      name: 'idLeader',
      allowNull: false
    }
  });

  Organization.belongsToMany(User, {
    through: OrganizationMember,
    foreignKey: {
      name: 'idOrganization'
    }
  });

  User.belongsToMany(Organization, {
    through: OrganizationMember,
    foreignKey: {
      name: 'idMember'
    }
  });

  Agenda.hasMany(Topic, {
    foreignKey: {
      name: 'idAgenda',
      allowNull: false
    }
  });

  Topic.belongsTo(Agenda, {
    foreignKey: {
      name: 'idAgenda',
      allowNull: false
    }
  });

  Agreement.hasMany(Response, {
    foreignKey: {
      name: 'idAgreement',
      allowNull: false
    }
  });

  Response.belongsTo(Agreement, {
    foreignKey: {
      name: 'idAgreement',
      allowNull: false
    }
  });

  User.hasMany(Agreement, {
    foreignKey: {
      name: 'idResponsible',
      allowNull: false
    }
  });

  Agreement.belongsTo(User, {
    foreignKey: {
      name: 'idResponsible',
      allowNull: false
    }
  });

  Organization.hasMany(TypeOfMeeting, {
    foreignKey: {
      name: 'idOrganization',
      allowNull: false
    }
  });

  TypeOfMeeting.belongsTo(Organization, {
    foreignKey: {
      name: 'idOrganization',
      allowNull: false
    }
  });

  TypeOfMeeting.hasMany(Agenda, {
    foreignKey: {
      name: 'idTypeOfMeeting',
      allowNull: false
    }
  });

  Agenda.belongsTo(TypeOfMeeting, {
    foreignKey: {
      name: 'idTypeOfMeeting',
      allowNull: false
    }
  });

  Meeting.hasMany(Agreement, {
    foreignKey: {
      name: 'idMeeting',
      allowNull: false
    }
  });

  Agreement.belongsTo(Meeting, {
    foreignKey: {
      name: 'idMeeting',
      allowNull: false
    }
  });

  User.hasMany(Meeting, {
    foreignKey: 'idSecretary'
  });

  Meeting.belongsTo(User, {
    as: 'secretary',
    foreignKey: 'idSecretary'
  });

  TypeOfMeeting.hasMany(Meeting, {
    foreignKey: {
      name: 'idTypeOfMeeting',
      allowNull: false
    }
  });

  Meeting.belongsTo(TypeOfMeeting, {
    foreignKey: {
      name: 'idTypeOfMeeting',
      allowNull: false
    }
  });

  Meeting.belongsToMany(User, {
    through: MeetingWorker,
    foreignKey: { name: 'idMeeting' }
  });

  User.belongsToMany(Meeting, {
    through: MeetingWorker,
    foreignKey: { name: 'idWorker' }
  });
}
