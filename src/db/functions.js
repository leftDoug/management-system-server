import { QueryTypes } from 'sequelize';
import { sequelize } from './config';
import picocolors from 'picocolors';

const fnUserGetinfo = `
  CREATE OR REPLACE FUNCTION public.fn_user_getinfo(
    id uuid,
    dbuser refcursor)
      RETURNS refcursor
      LANGUAGE 'plpgsql'
      
  AS $BODY$
  BEGIN
    OPEN dbuser FOR SELECT users."id",
      users."username",
      roles."role",
      users."name",
      users."email",
      users."occupation",
      areas."name" as area
    FROM users
      JOIN roles ON users."idRole" = roles."id"
      JOIN areas ON users."idArea" = areas."id"
    WHERE users."id" = $1;
    RETURN dbuser;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Something went wrong';
  END;
  $BODY$;

  ALTER FUNCTION public.fn_user_getinfo(uuid, refcursor)
      OWNER TO postgres;
  `;

export const createFunctions = async () => {
  try {
    const [userGetinfoExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = 'fn_user_getinfo'
      )
      `,
      { type: QueryTypes.SELECT }
    );

    !userGetinfoExists.exists && (await sequelize.query(fnUserGetinfo));
  } catch (error) {
    console.log(picocolors.red(picocolors.bold('ERROR: ')), error);
  }
};
