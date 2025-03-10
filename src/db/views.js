import { QueryTypes } from 'sequelize';
import { sequelize } from './config';
import picocolors from 'picocolors';

export const view_workers = `
  CREATE OR REPLACE VIEW  public.view_workers
    AS
    SELECT users."id", users."name"
    FROM users
    ORDER BY users."name";

    ALTER TABLE public.view_workers
      OWNER TO postgres;
  `;
export const view_users = `
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

    !viewWorkersExists.exists && (await sequelize.query(view_workers));

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

    !viewUsersExists.exists && (await sequelize.query(view_users));
  } catch (error) {
    console.log(picocolors.red(picocolors.bold('ERROR: ')), error);
  }
};
