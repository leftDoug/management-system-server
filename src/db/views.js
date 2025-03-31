import { QueryTypes } from 'sequelize';
import { sequelize } from './config.js';
import picocolors from 'picocolors';

const viewWorkers = `
  CREATE OR REPLACE VIEW  public.view_workers
    AS
    SELECT users."id", users."name"
    FROM users
    ORDER BY users."name";

    ALTER TABLE public.view_workers
      OWNER TO postgres;
  `;
const viewUsers = `
  CREATE OR REPLACE VIEW public.view_users
    AS
    SELECT users."id",
      users."username",
      roles."role",
      users."name" AS worker,
      users."occupation",
      areas."name" AS area,
      users."state"
    FROM users
      JOIN roles ON users."idRole" = roles."id"
      JOIN areas ON users."idArea" = areas."id"
    ORDER BY users."username";

    ALTER TABLE public.view_users
        OWNER TO postgres;
  `;
const viewOrganizations = `
  CREATE OR REPLACE VIEW public.view_organizations
    AS
    SELECT organizations."id",
      organizations."name",
      users."name" AS leader
    FROM organizations
      JOIN users ON organizations."idLeader" = users."id"
    WHERE organizations."state" = 'true'
    ORDER BY organizations."name";

    ALTER TABLE public.view_organizations
        OWNER TO postgres;
  `;

export const createViews = async () => {
  try {
    const [viewWorkersExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.views
        WHERE table_name = 'view_workers'
      )
      `,
      {
        type: QueryTypes.SELECT
      }
    );

    !viewWorkersExists.exists && (await sequelize.query(viewWorkers));

    const [viewUsersExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.views
        WHERE table_name = 'view_users'
      )
      `,
      {
        type: QueryTypes.SELECT
      }
    );

    !viewUsersExists.exists && (await sequelize.query(viewUsers));

    const [viewOrganizationsExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.views
        WHERE table_name = 'view_organizations'
      )
      `,
      {
        type: QueryTypes.SELECT
      }
    );

    !viewOrganizationsExists.exists &&
      (await sequelize.query(viewOrganizations));
  } catch (error) {
    console.log(picocolors.red(picocolors.bold('ERROR: ')), error);
  }
};
